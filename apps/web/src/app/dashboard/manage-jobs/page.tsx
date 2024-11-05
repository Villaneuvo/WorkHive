"use client";

import JobPostListTable from "@/components/section/jobpost-list-table/JobPostListTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionUser } from "@/utils/interfaces";

export default function SubscriptionPage() {
    const [user, setUser] = useState<any>({});
    const { data: session, status } = useSession();
    const { id, role } = session?.user as SessionUser;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/users/${id}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchData();
    }, [id]);
    if (!session) {
        return <p>Anda belum login</p>;
    }
    if (role === "USER") {
        return <p>You are not allowed</p>;
    }
    if (loading) return <p>Loading...</p>;
    return <JobPostListTable adminId={user.Admin.id} />;
}
