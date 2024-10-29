"use client";
import { Button } from "@/components/Button";
import ModalFormInterview from "@/components/popup/modal-form-interview/ModalFormInterview";
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
            <ModalFormInterview
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={() => {
                    if (ref.current) {
                        ref.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }
                }}
                formik={formik}
                list={people}
                ref={ref}
            />
        </>
    );
}
