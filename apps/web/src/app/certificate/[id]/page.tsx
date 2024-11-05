"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";
import { Certificate } from "@/utils/interfaces";
import { formatDate, formatDateExpiredDateCV } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";

export default function CertificateTemplate({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");
    const skillAssessmentId = params.id;
    const [certificate, setCertificate] = useState<Partial<Certificate>>({});
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/certificate?userId=${userId}&skillAssessmentId=${skillAssessmentId}`,
                );
                setCertificate(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);
    if (certificate == undefined) return <div>You Don't Have The Certificate</div>;
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 p-4">
            <div className="border-reseda-green relative h-[600px] w-[800px] rounded-lg border-4 bg-white p-10">
                {/* Logo atau Nama Penerbit */}
                <div className="text-reseda-green absolute left-4 top-4 text-2xl font-bold">WorkHive</div>

                {/* Judul Sertifikat */}
                <h1 className="mb-8 text-center text-4xl font-extrabold text-gray-800">Sertifikat Kelulusan</h1>

                {/* Nama Pengguna */}
                <p className="mb-4 text-center text-2xl">Menyatakan bahwa</p>
                <h2 className="text-reseda-green mb-6 text-center text-3xl font-semibold">{certificate.user?.name}</h2>

                {/* Detail Pelatihan */}
                <p className="mb-4 text-center text-xl">telah berhasil menyelesaikan</p>
                <h3 className="mb-6 text-center text-2xl font-medium text-gray-700">{certificate.title} Master</h3>

                {/* Tanggal Penyelesaian */}
                <p className="mb-8 text-center text-lg">pada {formatDate(certificate.completionDate)}</p>

                {/* QR Code untuk Verifikasi */}
                <div className="absolute bottom-4 right-4 flex items-center">
                    <QRCodeSVG
                        value={`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/verify/${certificate.verificationCode}`}
                        size={80}
                    />
                </div>

                {/* Footer */}
                {/* Tanggal Kadaluarsa */}
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-sm text-gray-500">
                    Berlaku hingga: {formatDateExpiredDateCV(certificate.expiredDate)}
                </p>
                <div className="absolute bottom-4 left-4 text-sm text-gray-500">
                    Kode Sertifikat: {certificate.verificationCode}
                </div>
            </div>
        </div>
    );
}
