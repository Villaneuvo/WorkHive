"use client";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormikValues, useFormik } from "formik";
import { registerUser } from "@/utils/service/auth";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";
import Alert from "@/components/Alert";

const RegisterFormSchema = z
    .object({
        email: z.string().email("Invalid email").min(1, "Email is required"),
        password: z.string().min(1, "Password is required"),
        confirm_password: z.string().min(1, "Confirm password is required"),
        aggree: z.boolean(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"], // Path of the error
    });
type RegisterFormSchemaType = z.infer<typeof RegisterFormSchema>;

export default function RegisterForm() {
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
    }, [status, router]);

    async function handleSubmit(values: FormikValues) {
        try {
            const res = await registerUser({
                email: values.email as string,
                password: values.password as string,
            }).catch((err) => err.data);
            if (!res?.user?.id) {
                setMessage({
                    type: "error",
                    content: res?.message || res.errors[0].message,
                });
            } else {
                setMessage({
                    type: "success",
                    content: res.message,
                });
                formik.resetForm();
            }
        } catch (error: unknown) {
            setMessage({
                type: "error",
                content: "Something went wrong. Please try again later.",
            });
        }
    }

    const formik = useFormik<RegisterFormSchemaType>({
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
            aggree: false,
        },
        validate: withZodSchema(RegisterFormSchema),
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
                <TextField
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.confirm_password && formik.touched.confirm_password
                            ? (formik.errors.confirm_password as string)
                            : ""
                    }
                />
                <div className="flex items-center justify-between">
                    <Checkbox
                        name="agree"
                        label={
                            <>
                                I accept the{" "}
                                <a
                                    href=""
                                    target="_blank"
                                    className="text-primary-dark cursor-pointer font-bold hover:underline"
                                >
                                    Terms and Conditions
                                </a>
                            </>
                        }
                        checked={formik.values.aggree}
                        onChange={(e) => formik.setFieldValue("aggree", e.target.checked)}
                    />
                </div>
                <Button disabled={!formik.values.aggree} type="submit" className="w-full">
                    Create an account
                </Button>
                <hr />
                <Button variant="outline" className="w-full">
                    Sign up with Google
                </Button>
                <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Login here
                    </Link>
                </p>
            </form>
        </>
    );
}
