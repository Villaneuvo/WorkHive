"use client";

import CVTemplateATS from "@/components/section/cv-form/CVTemplate";
import { useSearchParams } from "next/navigation";

export default function CVPage() {
    const searchParams = useSearchParams();
    const queryUserId = searchParams.get("userId");
    return (
        <div>
            <CVTemplateATS userId={queryUserId || ""} />
        </div>
    );
}
