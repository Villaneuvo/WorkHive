import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./utils/authOptions";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import Header from "@/components/section/header/Header";
import { Footer } from "@/components/section/footer/Footer";

export const metadata: Metadata = {
    title: "JobTalk",
    description:
        "JobTalk is a platform for jobseekers to find their dream job and for employers to find their dream employees.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
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
