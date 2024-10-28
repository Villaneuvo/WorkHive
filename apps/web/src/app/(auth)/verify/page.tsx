import React from "react";
import { verifyUserRegis } from "@/utils/service/auth";
import RedirectWithInfo from "@/components/organism/redirect-info/RedirectWithInfo";
import Alert from "@/components/Alert";

const handleVerifyUser = async (token: string) => {
    try {
        const response = await verifyUserRegis({ token });
        console.log(response);
        if (response.data.message === "Email verified successfully!") {
            return {
                status: "success",
                message: response?.data?.message,
            };
        } else {
            return {
                status: "error",
                message: response?.data?.message,
            };
        }
    } catch (error: unknown) {
        return {
            status: "error",
            message: "An error occurred!",
        };
    }
};

const VerifyEmailPage = async ({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const response = await handleVerifyUser(searchParams?.token as string);
    return (
        <div className="w-full max-w-md">
            <Alert
                className="mb-4 text-center"
                type={response?.status === "success" ? "success" : "error"}
                message={response?.message}
            />
            {response?.status == "success" ? <RedirectWithInfo time={5000} url="/login" /> : null}
        </div>
    );
};

export default VerifyEmailPage;
