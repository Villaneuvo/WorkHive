import Card from "@/components/Card1";
import ForgotPasswordForm from "@/components/form/forgot-password/ForgotPasswordForm";
import React from "react";

export default function ForgotPasswordPage() {
    return (
        <Card>
            <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl">Forgot your password?</h1>
            <p className="mb-3 text-sm">Enter your email address and we'll send you a link to reset your password.</p>
            <ForgotPasswordForm />
        </Card>
    );
}
