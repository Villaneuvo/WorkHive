"use client";

import JobPostDetail from "@/components/section/jobpost-detail/JobPostDetail";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { SessionUser } from "@/utils/interfaces";

export default function SubscriptionPage({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<any>({});
    const { data: session, status } = useSession();
    const idUser = (session?.user as SessionUser)?.id;
    const role = (session?.user as SessionUser)?.role;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/users/${idUser}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        fetchData();
    }, [idUser]);
    if (!session) {
        return <p>Anda belum login</p>;
    }
    if (role === "USER") {
        return <p>You are not allowed</p>;
    }
    if (loading) return <p>Loading...</p>;
    return <JobPostDetail adminId={user.Admin.id} id={params.id} />;
}
