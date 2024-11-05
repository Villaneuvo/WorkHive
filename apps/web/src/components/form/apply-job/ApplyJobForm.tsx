"use client";
import Alert from "@/components/Alert";
import { Button } from "@/components/Button";
import TextField from "@/components/TextField";
import UploadFile from "@/components/UploadFile";
import { MAX_FILE_SIZE } from "@/utils/const";
import { applyJob } from "@/utils/service/jobs";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";

const ApplyJobFormSchema = z.object({
    cv: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / 1000000}MB.`)
        .refine((file) => file?.type === "application/pdf", "File must be a PDF."),
    expected_salary: z.number().int().positive().min(1, "Expected salary is required"),
});

type ApplyJobFormSchemaType = z.infer<typeof ApplyJobFormSchema>;

export default function ApplyJobForm({ jobId }: { jobId: number }) {
    const { data: session } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState<{
        content: string;
        type: "success" | "error";
    }>({
        content: "",
        type: "success",
    });
    const handleSubmit = async (values: FormikValues) => {
        try {
            const res = await applyJob({
                jobId: jobId,
                userId: Number(session?.user.id),
                cv: values.cv,
                expectedSalary: values.expected_salary,
            });
            if (res?.data) {
                setMessage({ content: "Apply job success", type: "success" });
                formik.resetForm();
            }
        } catch (e) {
            console.log(e);
            setMessage({ content: "Apply job failed", type: "error" });
        }
    };
    const formik = useFormik<ApplyJobFormSchemaType>({
        initialValues: {
            cv: null,
            expected_salary: 0,
        },
        validate: withZodSchema(ApplyJobFormSchema),
        onSubmit: handleSubmit,
    });
    return (
        <div>
            {message.content ? <Alert message={message.content} type={message.type} /> : null}
            <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
                <UploadFile
                    key={formik.values.cv}
                    name="cv"
                    label="Upload CV"
                    helperText={`File must be in PDF format and less than ${MAX_FILE_SIZE / 1000000}MB`}
                    onChange={(e) => {
                        if (e.target.files) {
                            formik.setFieldValue("cv", e.target.files[0]);
                        }
                    }}
                    errorMessage={formik.errors.cv && formik.touched.cv ? (formik.errors.cv as string) : ""}
                />
                <TextField
                    addOn="Rp"
                    type="text"
                    name="expected_salary"
                    label="Expected Salary (Rupiah)"
                    value={formik.values.expected_salary.toString()}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        formik.setFieldValue("expected_salary", Number(value));
                    }}
                    errorMessage={
                        formik.errors.expected_salary && formik.touched.expected_salary
                            ? (formik.errors.expected_salary as string)
                            : ""
                    }
                />
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        color="dark/white"
                        onClick={() => {
                            router.back();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
}
