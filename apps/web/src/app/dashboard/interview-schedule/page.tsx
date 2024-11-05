"use client";
import { Button } from "@/components/Button";
import ModalConfirm from "@/components/popup/modal-confirm/ModalConfirm";
import ModalFormInterview from "@/components/popup/modal-form-interview/ModalFormInterview";
import {
    createInterviewSchedule,
    deleteInterviewSchedule,
    getAllAvailableUsers,
    getAllInterviewSchedule,
    updateInterviewSchedule,
} from "@/utils/service/interview";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { set } from "cypress/types/lodash";
import { FormikValues, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import React, { useEffect } from "react";
import { z } from "zod";

const ScheduleFormSchema = z.object({
    id: z.string() || z.number(),
    user_id: z.number().min(1, "User is required"),
    datetime: z.string().min(1, "Date and Time is required"),
    userlabel: z.string(),
    status: z
        .string()
        .min(1, "Status is required")
        .refine((data) => {
            return ["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"].includes(data);
        }, "Invalid status"),
});

type ScheduleFormType = z.infer<typeof ScheduleFormSchema>;

export default function InterviewSchedulePage() {
    const ref = React.useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState<any>(null);
    const [userList, setUserList] = React.useState<any>([]);
    const [list, setList] = React.useState<any>([]);

    const handleSubmit = async (values: FormikValues) => {
        try {
            const res = await createInterviewSchedule({
                jobId: values.user_id,
                interviewDate: values.datetime,
            });
            if (res?.data) {
                handleGetInterviewSchedule();
                handleGetUsers();
                setIsOpen(false);
                formik.resetForm();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const formik = useFormik<ScheduleFormType>({
        initialValues: {
            id: "",
            user_id: 0,
            datetime: "",
            userlabel: "",
            status: "SCHEDULED",
        },
        validate: withZodSchema(ScheduleFormSchema),
        onSubmit: handleSubmit,
    });

    const handleGetUsers = async () => {
        try {
            const res = await getAllAvailableUsers();
            if (res?.data) {
                console.log("EHEHEHHE", res);
                setUserList(
                    res.data.map((el: any) => ({
                        label: `${el.user.name} - ${el.job.title}`,
                        value: el.id,
                    })),
                );
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleGetInterviewSchedule = async () => {
        try {
            const res = await getAllInterviewSchedule();
            console.log("IHIHIHIH", res);
            if (res?.data) {
                setList(res.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteInterviewSchedule(selectedData.id);
            handleGetInterviewSchedule();
            handleGetUsers();
            setIsOpenConfirm(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await updateInterviewSchedule({
                id: selectedData.id,
                interviewDate: formik.values.datetime,
                status: formik.values.status,
            });
            if (res?.data) {
                handleGetInterviewSchedule();
                setIsOpen(false);
                formik.resetForm();
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        handleGetUsers();
        handleGetInterviewSchedule();
    }, []);

    return (
        <>
            <div className="container min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="pt-10 sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        {/* {formik.values.datetime} */}
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Interview Schedule</h1>
                        <p className="mt-2 text-sm text-gray-700">Manage interview schedules for your organization</p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button
                            onClick={() => {
                                setIsOpen(true);
                                formik.setFieldValue("id", "");
                                formik.resetForm();
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
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {list.map((user: any, index: number) => (
                                <tr key={user?.JobApplication?.user?.email}>
                                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        {user?.JobApplication?.user?.name}
                                        <dl className="font-normal lg:hidden">
                                            <dt className="sr-only">Title</dt>
                                            <dd className="mt-1 truncate text-gray-700">
                                                {user?.JobApplication?.job?.title}
                                            </dd>
                                            <dt className="sr-only sm:hidden">Email</dt>
                                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                                {user?.JobApplication?.user?.email}
                                            </dd>
                                        </dl>
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                        {user?.JobApplication?.job?.title}
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                        {user?.JobApplication?.user?.email}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {
                                            //format date
                                            new Date(user.interviewDate).toLocaleString()
                                        }
                                    </td>
                                    <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                        {user?.status}
                                    </td>
                                    <td className="flex gap-2 py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                        <button
                                            onClick={() => {
                                                formik.setFieldValue("id", user.id);
                                                formik.setFieldValue("user_id", user.JobApplication?.jobId);
                                                formik.setFieldValue(
                                                    "userlabel",
                                                    `${user.JobApplication?.user?.name} - ${user.JobApplication?.job?.title}`,
                                                );
                                                formik.setFieldValue("status", user.status);
                                                formik.setFieldValue(
                                                    "datetime",
                                                    new Date(user?.interviewDate).toISOString().slice(0, 16),
                                                );
                                                setSelectedData(user);
                                                setIsOpen(true);
                                            }}
                                            className="flex items-center justify-center rounded-md bg-orange-500 p-1 text-white"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                            <span className="sr-only">edit {user?.JobApplication?.user?.name}</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedData(user);
                                                setIsOpenConfirm(true);
                                            }}
                                            className="flex items-center justify-center rounded-md bg-red-600 p-1 text-white"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                            <span className="sr-only">delete {user?.JobApplication?.user?.name}</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {list.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-4 text-center text-sm text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalFormInterview
                key={formik.values.id}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={() => {
                    // console.log(formik.values.id);
                    if (!formik.values.id) {
                        console.log(ref.current);
                        if (ref.current) {
                            ref.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                        }
                    } else {
                        handleUpdate();
                    }
                }}
                formik={formik}
                list={userList}
                ref={ref}
            />
            <ModalConfirm
                open={isOpenConfirm}
                onClose={() => setIsOpenConfirm(false)}
                title="Delete Schedule"
                description="Are you sure you want to delete this schedule?"
                onConfirm={() => {
                    handleDelete();
                }}
            />
        </>
    );
}
