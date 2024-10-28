"use client";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import TextField from "@/components/TextField";
import { changePasswordUser } from "@/utils/service/auth";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import React from "react";
import { z } from "zod";

const ChangePasswordFormSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters long"),
        confirm_password: z.string().min(6, "Password must be at least 6 characters long"),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
    });

type ChangePasswordFormSchemaType = z.infer<typeof ChangePasswordFormSchema>;

export default function ChangePasswordForm({ token }: { token: string | "" }) {
    const [message, setMessage] = React.useState<{
        type: "success" | "error";
        message: string;
    }>({
        type: "success",
        message: "",
    });
    const handleSubmit = async (values: FormikValues) => {
        try {
            const res = await changePasswordUser({
                password: values.password,
                token: token,
            });
        } catch (e) {
            console.error(e);
        }
    };
    const formik = useFormik<ChangePasswordFormSchemaType>({
        initialValues: {
            password: "",
            confirm_password: "",
        },
        validate: withZodSchema(ChangePasswordFormSchema),
        onSubmit: handleSubmit,
    });
    return (
        <>
            {message.message ? <Alert type={message.type} message={message.message} /> : null}
            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errorMessage={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                />
                <TextField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.touched.confirm_password && formik.errors.confirm_password
                            ? formik.errors.confirm_password
                            : ""
                    }
                />
                <div>
                    <Button type="submit" className="mt-4 w-full">
                        Change Password
                    </Button>
                </div>
            </form>
        </>
    );
}
