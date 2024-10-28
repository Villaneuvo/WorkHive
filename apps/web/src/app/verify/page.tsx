"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const VerifyEmailPage = () => {
    const [message, setMessage] = useState<string>("Verifying...");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            if (token) {
                try {
                    const baseAPIURL = process.env.NEXT_PUBLIC_API_URL;
                    const response = await axios.post(`${baseAPIURL}/auth/verify`, { token });

                    if (response.data.message === "Email verified successfully!") {
                        setMessage("Email verified successfully! Redirecting to login...");
                        setTimeout(() => {
                            router.push("/login");
                        }, 5000);
                    } else {
                        setMessage(response.data.message || "Verification failed. Redirecting to login...");
                        setTimeout(() => {
                            router.push("/login");
                        }, 5000);
                    }
                } catch (error) {
                    setMessage("Email verification failed. Invalid or expired token. Redirecting to login...");
                    setTimeout(() => {
                        router.push("/login");
                    }, 5000);
                }
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div>
            <h1>{message}</h1>
            {message === "Verifying..." && <div className="loader"></div>}
        </div>
    );
};

export default VerifyEmailPage;
