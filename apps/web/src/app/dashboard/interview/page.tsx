"use client";
import { Button } from "@/components/Button";
import ModalConfirm from "@/components/popup/modal-confirm/ModalConfirm";
import ModalFormInterview from "@/components/popup/modal-form-interview/ModalFormInterview";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import React from "react";
import { z } from "zod";

const ScheduleFormSchema = z.object({
    id: z.string() || z.number(),
    user_id: z.string().min(1, "User is required"),
    datetime: z.string().min(1, "Date and Time is required"),
});

type ScheduleFormType = z.infer<typeof ScheduleFormSchema>;

const list = [
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

const people = [
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
];

export default function InterviewSchedulePage() {
    const ref = React.useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState<any>(null);

    const handleSubmit = async (values: FormikValues) => {
        alert(JSON.stringify(values, null, 2));
    };

    const formik = useFormik<ScheduleFormType>({
        initialValues: {
            id: "",
            user_id: "",
            datetime: "",
        },
        validate: withZodSchema(ScheduleFormSchema),
        onSubmit: handleSubmit,
    });

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="pt-10 sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Interview Schedule</h1>
                        <p className="mt-2 text-sm text-gray-700">Manage interview schedules for your organization</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button
                            onClick={() => {
                                setIsOpen(true);
                                formik.setFieldValue("id", "");
                            }}
                        >
                            Add Schedule
                        </Button>
                    </div>
                </div>
                <div className="-mx-4 mt-8 sm:-mx-0">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                                >
                                    Title
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                >
                                    Email
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Date
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person, index) => (
                                <tr key={person.email}>
                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        {person.name}
                                        <dl className="font-normal lg:hidden">
                                            <dt className="sr-only">Title</dt>
                                            <dd className="mt-1 truncate text-gray-700">{person.title}</dd>
                                            <dt className="sr-only sm:hidden">Email</dt>
                                            <dd className="mt-1 truncate text-gray-500 sm:hidden">{person.email}</dd>
                                        </dl>
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {person.title}
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                        {person.email}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">{person.date}</td>
                                    <td className="flex gap-2 py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                        <button
                                            onClick={() => {
                                                formik.setFieldValue("id", index);
                                                setSelectedData(person);
                                                setIsOpen(true);
                                            }}
                                            className="flex items-center justify-center rounded-md bg-orange-500 p-1 text-white"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                            <span className="sr-only">edit {person.name}</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedData(person);
                                                setIsOpenConfirm(true);
                                            }}
                                            className="flex items-center justify-center rounded-md bg-red-600 p-1 text-white"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            <span className="sr-only">delete {person.name}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalFormInterview
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={() => {
                    if (ref.current) {
                        ref.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                    }
                }}
                formik={formik}
                list={list}
                ref={ref}
            />
            <ModalConfirm
                open={isOpenConfirm}
                onClose={() => setIsOpenConfirm(false)}
                title="Delete Schedule"
                description="Are you sure you want to delete this schedule?"
                onConfirm={() => {
                    alert("Delete");
                }}
            />
        </>
    );
}
