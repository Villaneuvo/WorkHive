"use client";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import TextField from "@/components/TextField";
import { forgotPasswordUser } from "@/utils/service/auth";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { z } from "zod";

const ForgotPasswordFormSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
});

type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
    const [message, setMessage] = useState<{
        type: "success" | "error";
        content: string;
    }>({
        type: "success",
        content: "",
    });
    const handleSubmit = async (values: FormikValues) => {
        try {
            const res = await forgotPasswordUser({
                email: values.email,
            });
            if (res?.message) {
                setMessage({
                    type: "success",
                    content:
                        "Check your email for a password reset link. If you do not receive an email, please check your spam folder.",
                });
                formik.resetForm();
            } else {
                throw res;
            }
        } catch (e) {
            console.error(e);
            formik.resetForm();
            setMessage({
                type: "success",
                content:
                    "Check your email for a password reset link. If you do not receive an email, please check your spam folder.",
            });
        }
    };
    const formik = useFormik<ForgotPasswordFormSchemaType>({
        initialValues: {
            email: "",
        },
        validate: withZodSchema(ForgotPasswordFormSchema),
        onSubmit: handleSubmit,
    });
    return (
        <>
            {message.content ? <Alert type={message.type} message={message.content} /> : null}
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                />
                <Button type="submit" className="mt-4 w-full">
                    Send reset link
                </Button>
                <Button href="/login" variant="outline" className="mt-2 w-full">
                    Back to login
                </Button>
            </form>
        </>
    );
}
