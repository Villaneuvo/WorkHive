"use client";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import TextField from "@/components/TextField";
import { registerAdmin } from "@/utils/service/auth";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const RegisterFormSchema = z
    .object({
        email: z.string().email("Invalid email").min(1, "Email is required"),
        companyName: z.string().min(1, "Company name is required"),
        phoneNumber: z.string().min(1, "Phone mumber is required"),
        password: z.string().min(1, "Password is required"),
        confirm_password: z.string().min(1, "Confirm password is required"),
        aggree: z.boolean(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
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
            const res = await registerAdmin({
                email: values.email as string,
                companyName: values.companyName as string,
                phoneNumber: values.phoneNumber as string,
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
            companyName: "",
            phoneNumber: "",
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
                    name="companyName"
                    label="Company name"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.companyName && formik.touched.companyName
                            ? (formik.errors.companyName as string)
                            : ""
                    }
                />
                <TextField
                    name="phoneNumber"
                    label="Phone number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.phoneNumber && formik.touched.phoneNumber
                            ? (formik.errors.phoneNumber as string)
                            : ""
                    }
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

                <div className="relative mt-10">
                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-white px-6 text-gray-900">Or continue with</span>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                            <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"
                            />
                            <path
                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"
                            />
                        </svg>
                        <span className="text-sm font-semibold leading-6">Google</span>
                    </button>
                </div>

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
