import React from "react";

type CheckboxProps = {
    label?: string | React.ReactNode;

    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    checked?: boolean;
};

export default function Checkbox({ label = "", onChange = () => {}, name = "", checked = false }: CheckboxProps) {
    return (
        <div className="flex items-start">
            <div className="flex h-5 items-center">
                <input
                    id={name}
                    aria-describedby={name}
                    checked={checked}
                    onChange={(e) => onChange(e)}
                    type="checkbox"
                    className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                />
            </div>
            {label ? (
                <label htmlFor={name} className="ml-3 text-sm font-medium">
                    {label}
                </label>
            ) : null}
        </div>
    );
}
