"use client";

import AccountSubscription from "@/components/section/account-subscription/AccountSubscription";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SubscriptionPage() {
    const { data: session, status } = useSession();
    if (!session) {
        return <p>Anda belum login</p>;
    }
    const { id, role } = session?.user;
    return <AccountSubscription userId={id} />;
}
