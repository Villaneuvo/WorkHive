"use client";

import Card from "@/components/Card";
import LoginForm from "@/components/form/login/LoginForm";
// /app/auth/page.js
export default function LoginPage() {
    return (
        <Card>
            <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight md:text-2xl">Sign in to your account</h1>
            <LoginForm />
        </Card>
    );
}
