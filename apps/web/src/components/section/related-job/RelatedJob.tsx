"use client";

import { Job } from "@/utils/interfaces";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RelatedJob({ params }: { params: { adminId: string } }) {
    const [jobPosts, setJobPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/adminId/${params.adminId}`,
            );
            const data = res.data.data;
            setJobPosts(data);
        }
        fetchData();
    }, []);

    return (
        <>
            {jobPosts.map((jobPost: Job) => (
                <div
                    key={jobPost.id}
                    className="mb-5 flex overflow-hidden rounded-lg border border-gray-900/15 bg-white shadow-lg"
                >
                    <div className="ml-5 mt-5 h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                        <Image
                            width={100}
                            height={100}
                            alt="hehe"
                            src={jobPost.bannerUrl}
                            className="group-hover:opacity-75"
                        />
                    </div>
                    <div className="flex w-full flex-col p-6 text-xs">
                        <Link
                            href={`/jobs/${jobPost.id}`}
                            className="text-reseda-green text-xl font-semibold hover:underline"
                        >
                            {jobPost.title}
                        </Link>
                        <span className="text-gray-700">
                            {jobPost.cityLocation}, {jobPost.provinceLocation}
                        </span>
                        <span className="text-gray-700">{jobPost.admin.companyName}</span>
                    </div>
                    <div className="my-auto items-end p-6">
                        <Link
                            href={`/jobs/${jobPost.id}`}
                            className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                        >
                            Lamar
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
