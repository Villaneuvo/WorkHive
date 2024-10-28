import React from "react";
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="flex min-h-screen items-center justify-center">{children}</main>
            </body>
        </html>
    );
}
