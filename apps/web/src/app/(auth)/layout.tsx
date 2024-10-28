import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <section className="flex min-h-screen items-center justify-center">{children}</section>;
}
