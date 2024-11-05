"use client";
import React from "react";
import clsx from "clsx";

type TextFieldProps = {
    label?: string;
    placeholder?: string;
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    errorMessage?: string;
    addOn?: string;
    min?: string;
    max?: string;
};

export default function TextField({
    label = "",
    placeholder = "",
    type = "text",
    value = "",
    onChange = () => {},
    name = "",
    errorMessage = "",
    addOn = "",
    min = "",
    max = "",
}: TextFieldProps) {
    return (
        <div>
            {label ? (
                <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                    {label}
                </label>
            ) : null}
            <div className={`${label ? "mt-2" : ""} relative rounded-md shadow-sm`}>
                {addOn ? (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">{addOn}</span>
                    </div>
                ) : null}
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={clsx(
                        "focus:ring-primary-dark ring-primary-light block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                        addOn ? "pl-10" : "",
                    )}
                />
                {errorMessage ? <small className="mt-1 text-sm text-red-600">{errorMessage}</small> : null}
            </div>
        </div>
    );
}
