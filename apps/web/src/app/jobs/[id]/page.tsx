"use client";

import { Job } from "@/utils/interfaces";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { otherRequiremnts, frontEndRequirement } from "@/utils/requirement-data";
import Link from "next/link";
import RelatedJob from "@/components/section/related-job/RelatedJob";
import { IoBookmarkOutline } from "react-icons/io5";

export default function DetailsJobsPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<Job | null>(null);

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/${params.id}`);
            setJob(res.data);
        }
        fetchData();
    }, [params.id]);

    return (
        <div className="bg-white">
            <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
                    {/* Product image */}
                    <div className="lg:col-span-4 lg:row-end-1">
                        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                            <Image
                                alt="sample of company work environment"
                                src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                height={1000}
                                width={1000}
                                className="object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product details */}
                    <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
                        <div className="flex flex-col-reverse">
                            <div className="mt-4">
                                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                    {job?.title}
                                </h1>

                                <p className="mt-2 text-sm text-gray-500">{job?.admin?.companyName}</p>
                            </div>
                        </div>

                        <p className="mt-6 text-gray-500">{job?.description}</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <button
                                type="button"
                                className="bg-reseda-green hover:bg-reseda-green/70 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white transition delay-100 duration-300"
                            >
                                Lamar Pekerjaan
                            </button>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-x-2 rounded-md bg-gray-400 px-8 py-3 font-normal text-white transition delay-100 duration-300 hover:bg-gray-500"
                            >
                                <IoBookmarkOutline className="h-5 w-5" />
                                Simpan
                            </button>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-5">
                            <h3 className="text-reseda-green mb-5 text-xl font-semibold">Tentang Perushaan</h3>
                            <div className="mb-5 flex overflow-hidden rounded-lg border border-gray-900/15 bg-white shadow-lg">
                                <div className="ml-5 mt-5 h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                                    <Image
                                        width={60}
                                        height={60}
                                        alt="hehe"
                                        src={job?.bannerUrl || "/default-banner.jpg"}
                                        className="group-hover:opacity-75"
                                    />
                                </div>
                                <div className="flex max-w-40 flex-col justify-center p-6 text-sm">
                                    <span className="text-reseda-green font-semibold">{job?.admin?.companyName}</span>
                                </div>
                                <div className="my-auto flex w-fit justify-end p-6">
                                    <Link
                                        href="#"
                                        className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-3 text-sm font-medium text-white transition delay-100 duration-300"
                                    >
                                        Lihat Perushaaan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
                        <TabGroup>
                            <div className="border-b border-gray-200">
                                <TabList className="-mb-px flex space-x-8">
                                    <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                                        Persyaratan
                                    </Tab>
                                    <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                                        Lokasi
                                    </Tab>
                                    <Tab className="whitespace-nowrap border-b-2 border-transparent py-6 text-sm font-medium text-gray-700 hover:border-gray-300 hover:text-gray-800 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600">
                                        Lowongan Kerja Sejenis
                                    </Tab>
                                </TabList>
                            </div>
                            <TabPanels as={Fragment}>
                                <TabPanel className="-mb-10">
                                    <h3 className="sr-only">Infomrasi Lowongan</h3>

                                    <div className="flex flex-col gap-y-5 p-3">
                                        <div className="">
                                            <h3 className="text-reseda-green my-3 text-xl font-semibold">
                                                Informasi Lowongan
                                            </h3>
                                            <div className="grid grid-cols-3 gap-x-3">
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Tipe pekerjaan
                                                    </span>
                                                    <span className="text-sm">{job?.type}</span>
                                                </div>
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Fungsi Pekerjaan
                                                    </span>
                                                    <span className="text-sm">{job?.category}</span>
                                                </div>
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Remote / On-site
                                                    </span>
                                                    <span className="text-sm">Tidak disebutkan</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <h3 className="text-reseda-green my-3 text-lg font-semibold">
                                                Persyaratan
                                            </h3>
                                            <div className="mb-3 grid grid-cols-3 gap-x-3">
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Tingkat pendidikan
                                                    </span>
                                                    <span className="text-sm">S1, D3</span>
                                                </div>
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Jurusan Pendidikan
                                                    </span>
                                                    <span className="text-sm">
                                                        Ilmu Komputer, Teknik Informatika, Sistem Informasi, Manajemen
                                                        Informatika
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-y-1 text-gray-700">
                                                    <span className="text-lg font-semibold text-gray-900">
                                                        Minimal Pengalaman
                                                    </span>
                                                    <span className="text-sm">1 Tahun</span>
                                                </div>
                                            </div>
                                            <h3 className="text-reseda-green my-3 text-lg font-semibold">
                                                Skill yang dibutuhkan
                                            </h3>
                                            {frontEndRequirement.map((requirement) => (
                                                <div
                                                    key={requirement.name}
                                                    className="my-2 flex flex-row gap-x-1 text-gray-700"
                                                >
                                                    <span className="text-sm">
                                                        {requirement.minimumExperience} with {requirement.name}
                                                    </span>
                                                </div>
                                            ))}
                                            <h3 className="text-reseda-green my-3 text-lg font-semibold">
                                                Persyratan lainnyaz
                                            </h3>
                                            {otherRequiremnts.map((requirement) => (
                                                <div
                                                    key={requirement.name}
                                                    className="my-2 flex flex-row gap-x-1 text-gray-700"
                                                >
                                                    <span className="text-sm">{requirement.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel className="text-sm text-gray-500">
                                    <div className="">
                                        <h3 className="text-reseda-green my-3 text-xl font-semibold">Lokasi</h3>
                                        <div className="flex gap-x-5">
                                            <div className="flex flex-col gap-y-1 text-gray-700">
                                                <span className="text-lg font-semibold text-gray-900">Kota</span>
                                                <span className="text-sm">
                                                    {job?.cityLocation}, {job?.provinceLocation}
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col gap-y-1 text-gray-700">
                                                <span className="text-lg font-semibold text-gray-900">Alamat</span>
                                                <span className="text-sm">
                                                    Chase Plaza, Jl. Jenderal Sudirman No.21 Lt.7 Kav, RT.10/RW.1,
                                                    Kuningan, Karet, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah
                                                    Khusus Ibukota Jakarta 12920
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                                <TabPanel className="pt-10">
                                    {/* Related job */}
                                    {job?.adminId && <RelatedJob params={{ adminId: job.adminId }} />}
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}
