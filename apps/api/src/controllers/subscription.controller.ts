import prisma from "@/prisma";
import { ApproveSubscriptionType, SubscriptionType } from "@prisma/client";
import crypto from "crypto";
import { Request, Response } from "express";
import { MidtransClient } from "midtrans-node-client";

const snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function getAllUsersSubscriptions(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = (page - 1) * limit;
        const { search, sort } = req.query;
        const whereClause: any = {};
        whereClause.role = "USER";
        if (search) {
            whereClause.OR = [{ name: { contains: search as string } }, { email: { contains: search as string } }];
        }
        const [users, totalUsers] = await Promise.all([
            prisma.user.findMany({
                where: whereClause,
                include: {
                    subscription: true,
                },
                orderBy: {
                    subscription: {
                        isApproved: sort === "asc" ? "asc" : "desc",
                    },
                },
                skip: offset,
                take: limit,
            }),
            prisma.user.count({
                where: whereClause,
            }),
        ]);
        return res.status(200).json({
            data: users,
            pagination: {
                totalItems: totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page,
                pageSize: limit,
            },
        });
    } catch (error) {
        console.error("Error getting all subscriptions:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function getUserSubscription(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
            include: {
                subscription: true,
            },
        });
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user subscription:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function changeApproveStatus(req: Request, res: Response) {
    const { userId } = req.params;
    const { isApproved } = req.body;

    try {
        const subscription = await prisma.subscription.findUnique({
            where: { userId: +userId },
        });
        if (!subscription) {
            return res.status(404).json({ message: "Subscription not found." });
        }
        const endDate = subscription.endDate;
        endDate.setMonth(endDate.getMonth() + 1);
        if (isApproved === "APPROVED") {
            await prisma.subscription.update({
                where: { userId: +userId },
                data: {
                    isApproved,
                    isActive: true,
                    endDate,
                    ...(subscription.subscriptionType === "STANDARD" && { quotaAssessment: 2 }),
                },
            });
        } else {
            await prisma.subscription.update({
                where: { userId: +userId },
                data: {
                    isApproved,
                    transferProof: null,
                },
            });
        }
        return res.status(200).json({ message: "Subscription status updated." });
    } catch (error) {
        console.error("Error changing subscription status:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function postPayment(req: Request, res: Response) {
    const { userId, subscriptionType, method, transferProof } = req.body;
    try {
        let subscription = await prisma.subscription.findUnique({
            where: { userId: +userId },
        });
        let transaction;
        const amount = subscriptionType === "STANDARD" ? 25_000 : 100_000;
        if (subscription) {
            if (method === "transfer") {
                subscription = await prisma.subscription.update({
                    where: { userId: +userId },
                    data: {
                        subscriptionType: subscriptionType as SubscriptionType,
                        isApproved: "PENDING" as ApproveSubscriptionType,
                        transferProof,
                    },
                });
                transaction = { token: "" };
            } else {
                const paymentId = new Date().getTime();
                await prisma.subscription.update({
                    where: { userId: +userId },
                    data: {
                        subscriptionType: subscriptionType as SubscriptionType,
                        isApproved: "PENDING" as ApproveSubscriptionType,
                        paymentId: paymentId.toString(),
                    },
                });
                transaction = await snap.createTransaction({
                    transaction_details: {
                        order_id: paymentId.toString(),
                        gross_amount: amount,
                    },
                });
            }
        } else {
            const endDate = new Date();
            if (method === "transfer") {
                subscription = await prisma.subscription.create({
                    data: {
                        subscriptionType: subscriptionType as SubscriptionType,
                        isActive: false,
                        isApproved: "PENDING" as ApproveSubscriptionType,
                        transferProof,
                        user: { connect: { id: +userId } },
                        endDate,
                    },
                });
                transaction = { token: "" };
            } else {
                const paymentId = new Date().getTime();
                subscription = await prisma.subscription.create({
                    data: {
                        subscriptionType: subscriptionType as SubscriptionType,
                        isActive: false,
                        isApproved: "PENDING" as ApproveSubscriptionType,
                        user: { connect: { id: +userId } },
                        endDate,
                        paymentId: paymentId.toString(),
                    },
                });
                transaction = await snap.createTransaction({
                    transaction_details: {
                        order_id: paymentId.toString(),
                        gross_amount: amount,
                    },
                });
            }
        }
        return res.status(201).json({ data: { subscription, transaction } });
    } catch (error) {
        console.error("Error posting payment:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

export async function orderNotificationFromMidtrans(req: Request, res: Response) {
    // TODO: change url order notification on midtrans dashboard
    const data = req.body;
    const hash = crypto
        .createHash("sha512")
        .update(`${data.order_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
        .digest("hex");
    if (data.signature_key !== hash) {
        return { status: "error", message: "Invalid signature key" };
    }
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraudStatus;
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    try {
        const subscription = await prisma.subscription.findUnique({
            where: { paymentId: data.order_id },
        });
        if (transactionStatus === "capture") {
            if (fraudStatus === "accept") {
                await prisma.subscription.update({
                    where: { paymentId: data.order_id },
                    data: {
                        isActive: true,
                        isApproved: "APPROVED" as ApproveSubscriptionType,
                        endDate,
                        ...(subscription?.subscriptionType === "STANDARD" && { quotaAssessment: 2 }),
                    },
                });
            }
        } else if (transactionStatus === "settlement") {
            await prisma.subscription.update({
                where: { paymentId: data.order_id },
                data: {
                    isActive: true,
                    isApproved: "APPROVED" as ApproveSubscriptionType,
                    endDate,
                    ...(subscription?.subscriptionType === "STANDARD" && { quotaAssessment: 2 }),
                },
            });
        } else if (
            transactionStatus === "cancel" ||
            transactionStatus === "deny" ||
            transactionStatus === "expire" ||
            transactionStatus === "failure"
        ) {
            await prisma.subscription.update({
                where: { paymentId: data.order_id },
                data: {
                    isApproved: "REJECTED" as ApproveSubscriptionType,
                },
            });
        } else if (transactionStatus === "pending") {
            return;
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
