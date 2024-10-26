"use client";

import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { IoIosBriefcase } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { IoBookmarkOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError, fetchReverseGeocode } from "@/features/locationSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FormatRupiah } from "@arismun/format-rupiah";
import axios from "axios";
import Card from "@/components/Card";

export default function JobDiscovery() {
    const dispatch = useDispatch<ThunkDispatch<any, void, any>>();
    const { location, error, city } = useSelector((state: RootState) => state.location);
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [job, setJob] = useState<JobPost[]>([]);
    const dateNow = new Date();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setLocation({ lat: latitude, lng: longitude }));
                    dispatch(fetchReverseGeocode({ lat: latitude, lng: longitude }));
                },
                (err) => {
                    dispatch(setError("Error retrieving location"));
                },
                { enableHighAccuracy: true },
            );
        } else {
            dispatch(setError("Geolocation is not supported by this browser."));
        }
    }, [dispatch]);

    useEffect(() => {
        async function fetchData() {
            let params: { page: number; limit: number; cityLocation?: string } = {
                page: 1,
                limit: 6,
                cityLocation: city || "Ambatukam",
            };

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, { params });
            const rawData = res.data.data;

            setJobs(rawData);
            setJob(rawData);
        }
        fetchData();
    }, [city]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mx-auto mb-10 max-w-3xl sm:flex sm:flex-col sm:items-center sm:text-center">
                    {error ? (
                        <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                            Intip lowongan pekerjaan terbaru di WokrHive.com
                        </h2>
                    ) : (
                        <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                            Intip lowongan pekerjaan terbaru di {city}
                        </h2>
                    )}
                    <p className="mt-2 text-lg text-gray-600 sm:max-w-2xl">
                        Dapatkan lowongan pekerjaan yang sesuai dengan keahlian dan minatmu di WorkHive.com
                    </p>
                    <div></div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {jobs.map((job) => (
                        <Card key={job.title} job={job} />
                    {job.map((job: JobPost) => (
                        <Link
                            key={job?.title}
                            href="#"
                            className="hover:border-reseda-green group cursor-default rounded-md border border-gray-900/15 bg-white p-8 transition delay-100 duration-300"
                        >
                            <div className="my-auto flex">
                                <div className="h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                                    <Image
                                        width={100}
                                        height={100}
                                        alt={job?.title}
                                        src={job?.bannerUrl}
                                        className="group-hover:opacity-75"
                                    />
                                </div>
                                <div className="my-auto ml-5 w-full">
                                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                    <p className="text-sm text-gray-700">{job?.admin?.companyName}</p>
                                </div>
                            </div>
                            <div className="mt-10 flex w-full flex-col gap-y-3 text-base text-gray-500">
                                <span className="flex gap-x-2">
                                    <FaLocationDot className="h-5 w-5" /> {job.cityLocation}, {job.provinceLocation}
                                </span>
                                <span className="flex gap-x-2">
                                    <CiCreditCard1 className="h-5 w-5" /> Salary: Start from{" "}
                                    <FormatRupiah value={job.salary} />
                                </span>
                                <span className="flex gap-x-2">
                                    <IoIosBriefcase className="h-5 w-5" /> {job.type}
                                </span>
                                <span className="flex gap-x-2">
                                    <FaMagnifyingGlass className="h-5 w-5" /> Recruiter was hiring{" "}
                                    {Math.abs(
                                        Math.floor(
                                            (dateNow.getTime() - new Date(job.createdAt).getTime()) /
                                                (1000 * 3600 * 24),
                                        ),
                                    )}{" "}
                                    days ago
                                </span>
                                <span className="flex gap-x-2">
                                    <FaRegClock className="h-5 w-5" /> Apply Before{" "}
                                    {new Date(job.applicationDeadline).getDate()}{" "}
                                    {new Date(job.applicationDeadline).toLocaleString("en-US", {
                                        month: "long",
                                    })}
                                </span>
                            </div>
                            <div className="flex justify-center gap-x-4">
                                <button className="mt-10 flex w-32 items-center justify-center gap-x-2 rounded-md bg-gray-400 p-2 font-normal text-white transition delay-100 duration-300 hover:bg-gray-500">
                                    <IoBookmarkOutline className="h-5 w-5" />
                                    Simpan
                                </button>
                                <button className="bg-reseda-green hover:bg-reseda-green/70 mt-10 w-36 rounded-md p-2 font-medium text-white transition delay-100 duration-300">
                                    Lamar Pekerjaan
                                </button>
                            </div>
                        </Link>
                    ))}))}
                </div>
            </div>
        </div>
    );
}
