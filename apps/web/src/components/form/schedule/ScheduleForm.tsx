"use client";
import { Button } from "@/components/Button";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import React from "react";
import { z } from "zod";

const ScheduleFormSchema = z.object({
    user_id: z.string().min(1, "User is required"),
    datetime: z.string().min(1, "Date and Time is required"),
});

type ScheduleFormType = z.infer<typeof ScheduleFormSchema>;

const people = [
    {
        label: "Wade Cooper",
        value: "1",
    },
    {
        label: "Arlene McCoy",
        value: "2",
    },
    {
        label: "Devon Webb",
        value: "3",
    },
    {
        label: "Tom Cook",
        value: "4",
    },
    {
        label: "Tanya Fox",
        value: "5",
    },
    {
        label: "Hellen Schmidt",
        value: "6",
    },
    {
        label: "Caroline Schultz",
        value: "7",
    },
    {
        label: "Mason Heaney",
        value: "8",
    },
    {
        label: "Claudie Smitham",
        value: "9",
    },
    {
        label: "Emil Schaefer",
        value: "10",
    },
];

export default function ScheduleForm() {
    const ref = React.useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const handleSubmit = async (values: FormikValues) => {
        alert(JSON.stringify(values, null, 2));
    };
    const formik = useFormik<ScheduleFormType>({
        initialValues: {
            user_id: "",
            datetime: "",
        },
        validate: withZodSchema(ScheduleFormSchema),
        onSubmit: handleSubmit,
    });
    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Add Schedule</Button>
            <Modal
                onClose={() => {
                    setIsOpen(false);
                    formik.resetForm();
                }}
                open={isOpen}
                title="Add Schedule"
                onSubmit={() => {
                    ref.current?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                }}
            >
                <form ref={ref} onSubmit={formik.handleSubmit} className="space-y-3 pb-10">
                    <Select
                        list={people}
                        label="User"
                        selected={people.find((person) => person.value === formik.values.user_id)}
                        setSelected={(person) => formik.setFieldValue("user_id", person?.value)}
                        errorMessage={
                            formik.errors.user_id && formik.touched.user_id ? (formik.errors.user_id as string) : ""
                        }
                    />
                    <TextField
                        label="Date and Time"
                        type="datetime-local"
                        value={formik.values.datetime}
                        onChange={formik.handleChange}
                        errorMessage={
                            formik.errors.datetime && formik.touched.datetime ? (formik.errors.datetime as string) : ""
                        }
                        name="datetime"
                    />
                </form>
            </Modal>
        </>
    );
}
