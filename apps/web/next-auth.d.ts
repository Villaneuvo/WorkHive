import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            role: string;
            token: string;
            id: string;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
        token: string;
        id: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: string;
        token: string;
        id: string;
    }
}
