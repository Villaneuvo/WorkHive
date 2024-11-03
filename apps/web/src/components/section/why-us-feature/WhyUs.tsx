import React, { useId } from "react";

import { Container } from "@/components/Container";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbFilterEdit } from "react-icons/tb";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { BsBuildings } from "react-icons/bs";
import { PiReadCvLogo } from "react-icons/pi";

const features = [
    {
        name: "Beragam Lowongan Pekerjaan",
        description:
            "WorkHive.com menyediakan ribuan lowongan dari berbagai industri, sehingga kamu bisa menemukan pekerjaan sesuai minat dan keahlian.",
        icon: CarreerIcon,
    },
    {
        name: "Platform yang Mudah Digunakan",
        description:
            "Antarmuka yang intuitif memudahkan pengguna untuk menavigasi situs dan menemukan lowongan pekerjaan dengan cepat.",
        icon: DeviceCardsIcon,
    },
    {
        name: "Fitur Filter yang Canggih",
        description:
            "Kamu bisa memfilter pencarian berdasarkan lokasi, gaji, posisi, atau bidang pekerjaan, membuat pencarian lebih efisien dan tepat sasaran.",
        icon: FilterIcon,
    },
    {
        name: "Tips dan Panduan Karier",
        description:
            "WorkHive.com menawarkan berbagai tips karier, pembuatan CV, serta panduan wawancara yang akan membantumu menonjol di mata perekrut.",
        icon: TipsCareerIcon,
    },
    {
        name: "Reputasi Perusahaan Terpercaya",
        description:
            "Semua perusahaan yang ada di Karir.com sudah diverifikasi, sehingga kamu dapat melamar dengan percaya diri ke perusahaan yang benar-benar membutuhkan.",
        icon: TrustedIcon,
    },
    {
        name: "CV Generator",
        description:
            "WorkHive.com menyediakan fitur pembuatan CV yang menarik dan profesional, sehingga CV-mu akan menonjol di mata perekrut.",
        icon: CVCreationIcon,
    },
];

function CarreerIcon(props: React.SVGProps<SVGSVGElement>) {
    return <BsBuildings {...props} />;
}

function DeviceCardsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0a4 4 0 00-4 4v24a4 4 0 004 4h14a4 4 0 004-4V4a4 4 0 00-4-4H9zm0 2a2 2 0 00-2 2v24a2 2 0 002 2h14a2 2 0 002-2V4a2 2 0 00-2-2h-1.382a1 1 0 00-.894.553l-.448.894a1 1 0 01-.894.553h-6.764a1 1 0 01-.894-.553l-.448-.894A1 1 0 0010.382 2H9z"
                fill="#737373"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 13a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H10a1 1 0 01-1-1v-2zm1 5a1 1 0 00-1 1v2a1 1 0 001 1h12a1 1 0 001-1v-2a1 1 0 00-1-1H10z"
                fill="url(#:S1:-gradient)"
            />
            <rect x={9} y={6} width={14} height={4} rx={1} fill="#171717" />
            <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
            <defs>
                <linearGradient id=":S1:-gradient" x1={16} y1={12} x2={16} y2={28} gradientUnits="userSpaceOnUse">
                    <stop stopColor="#737373" />
                    <stop offset={1} stopColor="#737373" stopOpacity={0} />
                </linearGradient>
            </defs>
        </svg>
    );
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
    return <TbFilterEdit {...props} />;
}

function TipsCareerIcon(props: React.SVGProps<SVGSVGElement>) {
    return <MdOutlineTipsAndUpdates {...props} />;
}

function TrustedIcon(props: React.SVGProps<SVGSVGElement>) {
    return <VscWorkspaceTrusted {...props} />;
}

function CVCreationIcon(props: React.SVGProps<SVGSVGElement>) {
    return <PiReadCvLogo {...props} />;
}

export default function WhyUs() {
    return (
        <section aria-label="Features for building a WorkHive" className="py-10 sm:py-20">
            <Container>
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                        Kenapa mencari peluang karier di WorkHive.com adalah keputusan yang tepat?
                    </h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Dengan fitur pencarian yang mudah digunakan, kamu bisa menemukan pekerjaan yang sesuai dengan
                        keahlian dan minatmu.
                    </p>
                </div>
                <ul
                    role="list"
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
                >
                    {features.map((feature) => (
                        <li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
                            <feature.icon className="h-8 w-8" />
                            <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
                            <p className="mt-2 text-gray-700">{feature.description}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    );
}
