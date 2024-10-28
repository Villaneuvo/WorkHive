import axios from "axios";
import jwt from "jsonwebtoken";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";
dotenv.config();

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                try {
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { token } = response.data;

                    if (token) {
                        const decodedToken = jwt.decode(token) as {
                            id: string;
                            name: string;
                            email: string;
                            role: string;
                        };

                        const user = {
                            id: decodedToken.id,
                            name: decodedToken.name,
                            email: decodedToken.email,
                            role: decodedToken.role,
                            token,
                        };

                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.token = token.token;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
    pages: {
        signIn: "/login",
    },
};
