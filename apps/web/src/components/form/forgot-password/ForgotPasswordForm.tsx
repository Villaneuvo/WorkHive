"use client";
import { Button } from "@/components/Button";
import TextField from "@/components/TextField";
import { forgotPasswordUser } from "@/utils/service/auth";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { z } from "zod";

const ForgotPasswordFormSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
});

type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>;

export default function ForgotPasswordForm() {
    const handleSubmit = async (values: FormikValues) => {
        try {
            const res = await forgotPasswordUser({
                email: values.email,
            });
        } catch (e) {
            console.error(e);
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
