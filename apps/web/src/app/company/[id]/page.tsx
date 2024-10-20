"use client";

import { Container } from "@/components/Container";
import RelatedJob from "@/components/section/related-job/RelatedJob";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function DetailCompanyPage({ params }: { params: { id: string } }) {
    const [company, setCompany] = useState({
        companyName: "",
        companyDescription: "",
        companyCityLocation: "",
        companyProvince: "",
        companyBannerImg: "",
        phoneNumber: "",
    });

    useEffect(() => {
        async function fetchCompany() {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/company/${params.id}`,
                );
                const data = res.data;
                setCompany(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCompany();
    }, [params.id]);

    return (
        <div className="bg-white">
            <Container>
                <div
                    className="h-64 w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    }}
                ></div>

                <div className="mx-auto -mt-16 flex max-w-4xl flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
                    <Image
                        src={company.companyBannerImg}
                        alt={`${company.companyName} Logo`}
                        width={1000}
                        height={1000}
                        className="h-24 w-fit border-4 border-white object-cover shadow-lg"
                    />

                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">{company.companyName}</h2>
                        <p className="mt-2 text-gray-500">{company.companyDescription}</p>
                        <p className="mt-2 text-gray-500">
                            {company.companyCityLocation}, {company.companyProvince}
                        </p>
                        <p className="mt-2 text-gray-500">Phone: {company.phoneNumber}</p>
                    </div>
                </div>

                <div className="my-10">
                    <h2 className="text-reseda-green mb-5 text-2xl font-medium">Lowongan kerja yang tersedia</h2>
                    <RelatedJob params={{ adminId: params.id }} />
                </div>
            </Container>
        </div>
    );
}
