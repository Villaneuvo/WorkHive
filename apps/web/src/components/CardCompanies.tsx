import { Company } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function CardCompanies({ company }: { company: Company }) {
    return (
        // Make a card for each company
        <div className="flex gap-x-8 rounded-md bg-white p-4 shadow-md">
            <div className="h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                <Image
                    width={100}
                    height={100}
                    alt={company.companyName}
                    src={company.companyBannerImg}
                    className="group-hover:opacity-75"
                />
            </div>
            <div className="w-3/4">
                <div className="flex items-center justify-between space-x-2">
                    <span className="text-reseda-green text-xl font-medium">{company.companyName}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-gray-700">
                        {company.companyCityLocation}, {company.companyProvince}
                    </span>
                    <span className="text-gray-700">|</span>
                    <span className="text-gray-700">{company.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-2 text-justify lg:w-4/5">
                    <span className="text-gray-700">{company.companyDescription}</span>
                </div>
            </div>
            <div className="my-auto flex">
                <Link
                    href={`/company/${company.id}`}
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                >
                    Lihat Detail
                </Link>
            </div>
        </div>
    );
}
