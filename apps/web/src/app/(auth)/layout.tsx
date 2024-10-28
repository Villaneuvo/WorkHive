import React, { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <section className="my-5 flex min-h-screen items-center justify-center">{children}</section>;
}
