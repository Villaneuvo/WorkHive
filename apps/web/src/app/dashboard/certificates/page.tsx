"use client";

import CertificatesUserMenu from "@/components/section/certificates-user-menu/CertificatesUserMenu";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/utils/interfaces";

export default function CertificatesUserPage() {
    const { data: session } = useSession();
    const userId = (session?.user as SessionUser)?.id;
    if (!session) {
        return <p>Anda belum login</p>;
    }
    return <CertificatesUserMenu userId={userId} />;
}
