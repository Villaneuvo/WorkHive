import Modal from "@/components/Modal";
import Select from "@/components/Select";
import TextField from "@/components/TextField";
import React, { forwardRef } from "react";

type ModalFormInterviewProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    formik: any;
    list: Array<{ label: string; value: string }>;
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

const ModalComponent = forwardRef<HTMLFormElement, ModalFormInterviewProps>((props, ref) => {
    const { isOpen, onClose, onSubmit, formik, list } = props;
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
                    selected={list.find((item) => item.value == formik.values.user_id)}
                    setSelected={(value) => {
                        formik.setFieldValue("user_id", value);
                    }}
                    errorMessage={
                        formik.errors.user_id && formik.touched.user_id ? (formik.errors.user_id as string) : ""
                    }
                />
                <TextField
                    label="Date and Time"
                    type="datetime-local"
                    placeholder="Select Date and Time"
                    value={formik.values.datetime}
                    onChange={formik.handleChange}
                    errorMessage={
                        formik.errors.datetime && formik.touched.datetime ? (formik.errors.datetime as string) : ""
                    }
                    name="datetime"
                />
            </form>
        </Modal>
    );
});

export default ModalFormInterview;
