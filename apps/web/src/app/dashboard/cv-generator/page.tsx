"use client";

import CVForm from "@/components/section/cv-form/CVForm";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CVGeneratorPage() {
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
    if (!user.subscription?.isActive) {
        return <p className="mx-auto my-8 block text-center">Subscribe to access this feature</p>;
    }
    return <CVForm userId={idUser} />;
}
