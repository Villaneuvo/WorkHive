"use client";

import ManageSubsriptionsTable from "@/components/section/manage-subscriptions-table/ManageSubsriptionsTable";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/utils/interfaces";

export default function ManageSubscriptionsPage() {
    const { data: session, status } = useSession();
    const idUser = (session?.user as SessionUser)?.id;
    const role = (session?.user as SessionUser)?.role;
    if (!session) {
        return <p>Anda belum login</p>;
    }
    if (role === "USER" || role === "ADMIN") {
        return <p>You are not allowed</p>;
    }
    return <ManageSubsriptionsTable />;
}
