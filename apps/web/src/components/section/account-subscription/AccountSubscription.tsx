"use client";

import { User } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import SubscriptionStatus from "./SubscriptionStatus";

export default function AccountSubscription({ userId }: { userId: string }) {
    const [userSubscription, setUserSubscription] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        async function fetchUserSubscription() {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/userId/${userId}`,
                );
                setUserSubscription(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user subscription:", error);
            }
        }
        fetchUserSubscription();
    }, [userId]);
    function handleClick() {
        router.push(`/subsription/payment/${userId}`); // TODO: disesuaikan dengan path yang benar
    }
    if (loading) return <p>Loading...</p>;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">Account Subscription</h1>

                {/* Subscription Status Section */}
                <SubscriptionStatus
                    status={userSubscription.subscription?.isActive || false}
                    endDate={userSubscription.subscription?.endDate || ""}
                    method={userSubscription.subscription?.subscriptionType || ""}
                />

                {/* Subscription Categories Section */}
                <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    <SubscriptionCard
                        title="Standard"
                        price="IDR 25,000"
                        description="Akses ke CV Generator, 2 Skill Assessments Setiap Bulan."
                        features={["CV Generator", "Skill Assessment 2x"]}
                    />
                    <SubscriptionCard
                        title="Professional"
                        price="IDR 100,000"
                        description="Skill Assessments Tak Terbatas, Prioritas Review Saat Apply Job, CV Generator."
                        features={["CV Generator", "Skill Assessment Unlimited", "Prioritas Review"]}
                    />
                </div>

                {/* Payment Button */}
                {(userSubscription.subscription?.isApproved == "REJECTED" ||
                    !userSubscription.subscription?.isApproved) && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={handleClick}
                            className="bg-reseda-green hover:bg-reseda-green/75 focus:ring-reseda-green/20 rounded-md px-6 py-3 font-semibold text-white shadow-md focus:outline-none focus:ring"
                        >
                            Bayar Sekarang
                        </button>
                    </div>
                )}
                {userSubscription.subscription?.isApproved == "PENDING" && (
                    <div className="mt-6 text-center">Mohon menunggu Permintaan Anda Sedang Diproses.</div>
                )}
            </div>
        </div>
    );
}
