import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/authProvider";
import { authOptions } from "./api/auth/authOptions";

export const metadata: Metadata = {
    title: "WorkHive",
    description:
        "WorkHive is a platform for jobseekers to find their dream job and for employers to find their dream employees.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en" className="h-full bg-white">
            <head>
                <title>WorkHive</title>
                <meta name="description" content={metadata.description || ""} />
            </head>
            <body className="h-full">
                <AuthProvider session={session}>{children}</AuthProvider>
            </body>
        </html>
    );
}
