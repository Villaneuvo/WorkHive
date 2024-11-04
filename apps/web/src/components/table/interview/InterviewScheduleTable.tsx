"use client";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

const people = [
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
    { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", date: "2021-09-01" },
];

export default function InterviewScheduleTable() {
    return (
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
                    {people.map((person) => (
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
                            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{person.title}</td>
                            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{person.email}</td>
                            <td className="px-3 py-4 text-sm text-gray-500">{person.date}</td>
                            <td className="flex gap-2 py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
                                <button className="flex items-center justify-center rounded-md bg-orange-500 p-1 text-white">
                                    <PencilIcon className="h-4 w-4" />
                                    <span className="sr-only">edit {person.name}</span>
                                </button>
                                <button className="flex items-center justify-center rounded-md bg-red-600 p-1 text-white">
                                    <TrashIcon className="h-4 w-4" />
                                    <span className="sr-only">delete {person.name}</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
