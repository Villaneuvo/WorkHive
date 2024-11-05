import { Footer } from "@/components/section/footer/Footer";
import Header from "@/components/section/header/Header";
import React from "react";

export default function SkillAssessmentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
