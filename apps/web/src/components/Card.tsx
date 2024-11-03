import { Job } from "@/utils/interfaces";
import { FormatRupiah } from "@arismun/format-rupiah";
import Image from "next/image";
import Link from "next/link";
import { CiCreditCard1 } from "react-icons/ci";
import { FaLocationDot, FaMagnifyingGlass, FaRegClock } from "react-icons/fa6";
import { IoIosBriefcase } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";

export default function Card({ job }: { job: Job }) {
    const dateNow = new Date();

    return (
        <Link
            key={job?.title}
            href={`/jobs/${job.id}`}
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
                    <CiCreditCard1 className="h-5 w-5" /> Salary: Start from <FormatRupiah value={job.salary} />
                </span>
                <span className="flex gap-x-2">
                    <IoIosBriefcase className="h-5 w-5" /> {job.type}
                </span>
                <span className="flex gap-x-2">
                    <FaMagnifyingGlass className="h-5 w-5" /> Recruiter was hiring{" "}
                    {Math.abs(Math.floor((dateNow.getTime() - new Date(job.createdAt).getTime()) / (1000 * 3600 * 24)))}{" "}
                    days ago
                </span>
                <span className="flex gap-x-2">
                    <FaRegClock className="h-5 w-5" /> Apply Before {new Date(job.applicationDeadline).getDate()}{" "}
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
                <Link
                    href={`/jobs/${job.id}`}
                    className="bg-reseda-green hover:bg-reseda-green/70 mt-10 flex w-32 items-center justify-center gap-x-2 rounded-md p-2 font-normal text-white transition delay-100 duration-300"
                >
                    Lamar
                </Link>
            </div>
        </Link>
    );
}
