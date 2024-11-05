"use client";

import SkillAssessmentDiscovery from "@/components/section/skill-assessment-discovery/skillAssessmentDiscovery";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/utils/interfaces";

export default function Page() {
    const { data: session } = useSession();
    const idUser = (session?.user as SessionUser)?.id;
    return (
        <>
            <SkillAssessmentDiscovery userId={idUser} />
        </>
    );
}
