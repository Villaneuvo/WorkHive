"use client";

import PaymentPage from "@/components/section/payment-page/PaymentPage";
import { useSession } from "next-auth/react";

export default function SubscriptionPaymentPage() {
    const { data: session } = useSession();
    if (!session) {
        return <p>Anda belum login</p>;
    }
    const { id } = session?.user;
    return <PaymentPage userId={id} />;
}
