"use client";
import React from "react";

type TextFieldProps = {
    label?: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    errorMessage?: string;
};

export default function TextField({
    label = "",
    placeholder = "",
    type = "text",
    value = "",
    onChange = () => {},
    name = "",
    errorMessage = "",
}: TextFieldProps) {
    return (
        <div>
            {label ? (
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            ) : null}
            <div className={`${label ? "mt-2" : ""}`}>
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errorMessage ? <small className="mt-1 text-sm text-red-600">{errorMessage}</small> : null}
            </div>
        </div>
    );
}
