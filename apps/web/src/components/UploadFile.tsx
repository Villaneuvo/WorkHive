import React from "react";

type UploadFileProps = {
    name: string;
    label: string;
    helperText: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
};

export default function UploadFile({ name, label, helperText, onChange, errorMessage = "" }: UploadFileProps) {
    return (
        <div>
            {label ? (
                <label className="mb-2 block text-sm font-medium text-gray-900" htmlFor={name}>
                    {label}
                </label>
            ) : null}
            <input
                className="ring-primary-light block w-full cursor-pointer rounded-md px-2 py-2 text-sm text-gray-900 ring-1 ring-inset"
                aria-describedby={name}
                onChange={onChange}
                id={name}
                type="file"
            />
            {helperText ? <p className="mt-1 text-sm text-gray-500">{helperText}</p> : null}
            {errorMessage ? <small className="mt-1 text-sm text-red-600">{errorMessage}</small> : null}
        </div>
    );
}
