import { Footer } from "@/components/section/footer/Footer";
import Header from "@/components/section/header/Header";
import AuthProvider from "@/utils/authProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import "./globals.css";

export const metadata: Metadata = {
    title: "WorkHive",
    description:
        "WorkHive is a platform for jobseekers to find their dream job and for employers to find their dream employees.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <head>
                <title>WorkHive</title>
            </head>

            <body className="">
                <AuthProvider session={session}>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
