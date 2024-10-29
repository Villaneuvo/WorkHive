"use client";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

type singleItem = {
    label: string;
    value: string | number;
};

type SelectTypeProps = {
    selected: singleItem | undefined;
    defaultvalue?: singleItem;
    setSelected?: (item?: singleItem) => void;
    list?: Array<singleItem>;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
};

export default function Select({
    selected,
    setSelected = () => {},
    list = [],
    label = "",
    defaultvalue,
    placeholder = "Select item",
    errorMessage = "",
}: SelectTypeProps) {
    return (
        <Listbox as={"div"} className="w-full" value={selected} onChange={setSelected}>
            {label ? <Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Label> : null}
            <div className="relative mt-2 w-full">
                <ListboxButton className="ring-primary-light relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none sm:text-sm sm:leading-6">
                    <span
                        className={clsx(
                            "block truncate",
                            selected?.label ? "font-normal" : "font-light text-gray-500 opacity-70",
                        )}
                    >
                        {selected?.label ? selected?.label : placeholder}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                    </span>
                </ListboxButton>
                {errorMessage ? <small className="mt-1 text-sm text-red-600">{errorMessage}</small> : null}
                <ListboxOptions
                    transition
                    className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                    {list.map((item, index) => (
                        <ListboxOption
                            key={index}
                            value={item?.value}
                            className="data-[focus]:bg-primary-dark group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:text-white"
                        >
                            <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                {item?.label}
                            </span>
                            <span className="text-primary-dark absolute inset-y-0 left-0 flex items-center pl-1.5 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    );
}
