"use client";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import Alert from "@/components/Alert";

const LoginFormSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export default function LoginForm() {
    const { status } = useSession();

    const searchParams = useSearchParams();
    const router = useRouter();
    const register = searchParams.get("register");

    const [message, setMessage] = useState<{
        type: "success" | "info" | "warning" | "error";
        content: string;
    }>({
        type: "success",
        content: "",
    });

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
            return;
        }
        if (register === "success") {
            setMessage({
                type: "success",
                content: "Account created successfully",
            });
        }
    }, [status, router]);

    async function handleSubmit(values: FormikValues) {
        try {
            setMessage({
                type: "success",
                content: "",
            });
            const result = await signIn("credentials", {
                redirect: false,
                email: values.email,
                password: values.password,
            });
            if (result?.error) {
                setMessage({
                    type: "error",
                    content: result.error,
                });
            } else {
                const callbackUrl = searchParams.get("callbackUrl") || "/";
                // router.push(callbackUrl);
                setTimeout(() => {
                    router.push(callbackUrl);
                }, 0);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const formik = useFormik<LoginFormSchemaType>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: withZodSchema(LoginFormSchema),
        onSubmit: handleSubmit,
    });

    return (
        <>
            {message.content ? <Alert type={message.type} message={message.content} /> : null}
            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
                <TextField
                    name="email"
                    label="Email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errorMessage={formik.errors.email && formik.touched.email ? (formik.errors.email as string) : ""}
                />
                <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.password && formik.touched.password ? (formik.errors.password as string) : ""
                    }
                />
                <div className="flex items-center justify-end">
                    <Link
                        href="/forgot-password"
                        className="text-primary-600 hover:text-primary-dark dark:text-primary-500 text-sm font-medium hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
                <Button type="submit" className="w-full">
                    Sign In
                </Button>

                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link href="/register" className="text-primary dark:text-primary font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    );
}
