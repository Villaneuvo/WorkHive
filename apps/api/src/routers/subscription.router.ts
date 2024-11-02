import {
    changeApproveStatus,
    getAllUsersSubscriptions,
    getUserSubscription,
    orderNotificationFromMidtrans,
    postPayment,
} from "@/controllers/subscription.controller";
import { Router } from "express";

const router = Router();

router.get("/admin", getAllUsersSubscriptions);
router.post("/payment", postPayment);
router.post("/notification", orderNotificationFromMidtrans);
router.get("/userId/:userId", getUserSubscription);
router.put("/approve/:userId", changeApproveStatus);

export default router;
