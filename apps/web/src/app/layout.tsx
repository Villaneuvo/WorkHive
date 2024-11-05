import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import AuthProvider from "@/utils/authProvider";
import { authOptions } from "./api/auth/authOptions";
import "./globals.css";
import { getServerSession } from "next-auth";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Work Hive",
    description: "Work Hive is a platform that connects job seekers with employers.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <AuthProvider session={session}>
                <body className={poppins.className}>{children}</body>
            </AuthProvider>
        </html>
    );
}
