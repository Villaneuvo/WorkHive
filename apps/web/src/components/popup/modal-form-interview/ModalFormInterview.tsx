import Modal from "@/components/Modal";
import Select from "@/components/MySelect";
import TextField from "@/components/TextField";
import { getAllAvailableUsers } from "@/utils/service/interview";
import React, { forwardRef, useEffect } from "react";

type ModalFormInterviewProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formik: any;
    list: any;
};

const ModalFormInterview = forwardRef<HTMLFormElement, ModalFormInterviewProps>(
    ({ isOpen, onClose, onSubmit, formik, list }, ref) => {
        return (
            <ModalComponent
                ref={ref}
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={onSubmit}
                formik={formik}
                list={list}
            />
        );
    },
);

const statislist = [
    { value: "SCHEDULED", label: "Scheduled" },
    { value: "RESCHEDULED", label: "Rescheduled" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
];

const ModalComponent = forwardRef<HTMLFormElement, ModalFormInterviewProps>((props, ref) => {
    const { isOpen, onClose, onSubmit, formik, list } = props;
    console.log(list);
    return (
        <Modal
            onClose={onClose}
            open={isOpen}
            title={formik.values.id === "" ? "Add Interview Schedule" : "Edit Interview Schedule"}
            onSubmit={onSubmit}
        >
            <form ref={ref} onSubmit={formik.handleSubmit} className="space-y-3 pb-10">
                <Select
                    list={list}
                    label="User"
                    disabled={!!formik.values.id}
                    placeholder={
                        formik.values.userlabel
                            ? formik.values.userlabel
                            : formik.values.user_id
                              ? list.find((item: any) => item.value == formik.values.user_id)?.label
                              : "Select User"
                    }
                    selected={
                        !formik.values.userlabel
                            ? list.find((item: any) => item.value == formik.values.user_id)
                            : formik.values.userlabel
                    }
                    setSelected={(value) => {
                        formik.setFieldValue("user_id", value);
                    }}
                    errorMessage={
                        formik.errors.user_id && formik.touched.user_id ? (formik.errors.user_id as string) : ""
                    }
                />
                {/* {formik.values.datetime} */}
                <TextField
                    label="Date and Time"
                    type="datetime-local"
                    placeholder="Select Date and Time"
                    value={formik.values?.datetime}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.datetime && formik.touched.datetime ? (formik.errors.datetime as string) : ""
                    }
                    name="datetime"
                />
                {formik.values.id !== "" ? (
                    <Select
                        list={statislist}
                        label="Status"
                        placeholder={formik.values.status}
                        selected={statislist.find((item: any) => item.value == formik.values.status)}
                        setSelected={(value) => {
                            formik.setFieldValue("status", value);
                        }}
                        errorMessage={
                            formik.errors.status && formik.touched.status ? (formik.errors.status as string) : ""
                        }
                    />
                ) : null}
            </form>
        </Modal>
    );
});

export default ModalFormInterview;
