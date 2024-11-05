"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const [savedJobs, setSavedJobs] = useState<any[]>([]);

    const { data: session } = useSession();
    const userId = session?.user.id;

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/users/${userId}/saved-jobs`,
                );
                setSavedJobs(response.data);
            } catch (error) {
                console.error("Error fetching saved jobs:", error);
            }
        };

        fetchSavedJobs();
    }, [userId]);

    console.log(savedJobs);

    return (
        <div className="container mx-auto mt-10">
            <h3 className="mb-4 text-center text-3xl font-semibold">Saved Job Posts</h3>
            <div className="mx-16 overflow-x-auto">
                <table className="min-w-full border border-gray-300 bg-white">
                    <thead>
                        <tr>
                            <th className="border-b-2 border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                Title
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                Category
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                Location
                            </th>
                            <th className="border-b-2 border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-600">
                                Salary
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedJobs.map((job) => (
                            <tr key={job?.jobPost?.id} className="hover:bg-gray-50">
                                <td className="border-b border-gray-200 px-6 py-4 text-sm">
                                    <Link
                                        href={`/jobs/${job?.jobPost?.id}`}
                                        className="text-reseda-green hover:text-reseda-green/70"
                                    >
                                        {job?.jobPost?.title}
                                    </Link>
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                                    {job?.jobPost?.category}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                                    {job?.jobPost?.cityLocation}, {job?.jobPost?.provinceLocation}
                                </td>
                                <td className="border-b border-gray-200 px-6 py-4 text-sm text-gray-700">
                                    {job?.jobPost?.salary
                                        ? `$${job?.jobPost?.salary.toLocaleString()}`
                                        : "Not specified"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
