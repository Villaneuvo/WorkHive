"use client";

import { Button } from "@/components/Button";
import { Dialog, DialogActions, DialogDescription, DialogTitle } from "@/components/Dialog";
import UploadButton from "@/components/UploadButton";
import { SnapWindow } from "@/utils/interfaces";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage({ userId }: { userId: string }) {
    const [selectedType, setSelectedType] = useState("STANDARD");
    const [selectedMethod, setSelectedMethod] = useState("transfer");
    const [transferProof, setTransferProof] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hidden, setHidden] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const myMidtransClientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", myMidtransClientKey as string);

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    function handleMethodChange(method: string) {
        setSelectedMethod(method);
    }
    function handleTypeChange(type: string) {
        setSelectedType(type);
    }
    async function postPayment() {
        try {
            const bodyRequest = {
                userId,
                subscriptionType: selectedType,
                method: selectedMethod,
                transferProof,
            };
            console.log(bodyRequest);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/payment`,
                bodyRequest,
            );
            return response.data;
        } catch (error) {
            console.error("Error posting payment:", error);
        }
    }
    async function handleSubmit() {
        if (selectedMethod === "transfer") {
            if (!transferProof) return alert("Silakan unggah bukti transfer.");
            postPayment();
            setIsOpen(true);
            return;
        }
        const data = await postPayment();
        setHidden(false);
        (window as SnapWindow).snap!.embed(data.data.transaction.token, {
            embedId: "snap-container",
        }); // TODO: setelah payment gateway selesai, redirect ke halaman subscription, settingan di dashboard midtrans
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
            <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-gray-800">Selesaikan Pembayaran Anda</h1>

                {/* Pemilihan Paket */}
                <div className="mb-6">
                    <p className="mb-2 font-medium text-gray-700">Pilih Paket yang Diambil:</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleTypeChange("STANDARD")}
                            className={`rounded-md px-4 py-2 font-medium ${
                                selectedType === "STANDARD" ? "bg-reseda-green text-white" : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Standard
                        </button>
                        <button
                            onClick={() => handleTypeChange("PROFESSIONAL")}
                            className={`rounded-md px-4 py-2 font-medium ${
                                selectedType === "PROFESSIONAL"
                                    ? "bg-reseda-green text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Professional
                        </button>
                    </div>
                </div>

                {/* Pemilihan Metode Pembayaran */}
                <div className="mb-6">
                    <p className="mb-2 font-medium text-gray-700">Pilih Metode Pembayaran:</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleMethodChange("transfer")}
                            className={`rounded-md px-4 py-2 font-medium ${
                                selectedMethod === "transfer"
                                    ? "bg-reseda-green text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Transfer Bank
                        </button>
                        <button
                            onClick={() => handleMethodChange("gateway")}
                            className={`rounded-md px-4 py-2 font-medium ${
                                selectedMethod === "gateway"
                                    ? "bg-reseda-green text-white"
                                    : "bg-gray-200 text-gray-700"
                            }`}
                        >
                            Payment Gateway
                        </button>
                    </div>
                </div>

                {/* Opsi Transfer Bank */}
                {selectedMethod === "transfer" && (
                    <div className="mb-6">
                        <p className="text-gray-700">Pembayaran melalui BRI 12345678911 a.n. PT.WorkHive</p>
                        <p className="text-gray-700">Silakan unggah bukti transfer bank:</p>
                        <UploadButton setCallback={setTransferProof} />
                        {transferProof && (
                            <div className="relative my-1 h-32 w-32 overflow-hidden rounded-lg">
                                <Image
                                    src={transferProof}
                                    fill={true}
                                    sizes="(max-width: 768px) 100vw, 128px"
                                    alt="Banner"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Opsi Payment Gateway */}
                {selectedMethod === "gateway" && (
                    <div className="mb-6 text-gray-700">
                        <p>Anda akan diarahkan ke payment gateway untuk menyelesaikan transaksi.</p>
                    </div>
                )}

                {/* Tombol Kirim */}
                <button
                    onClick={handleSubmit}
                    className="bg-reseda-green hover:bg-reseda-green/75 w-full rounded-md px-4 py-2 font-medium text-white transition duration-300"
                >
                    Konfirmasi Pembayaran
                </button>
            </div>
            <div
                id="snap-container"
                className={`fixed left-0 top-0 z-50 h-full w-full bg-white ${hidden ? "hidden" : ""}`}
            ></div>

            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle>Terima Kasih Telah Mengunggah Bukti Transfer</DialogTitle>
                <DialogDescription>
                    Mohon Tunggu, Pembayaran anda sedang diverifikasi. Admin kami akan memverifikasi pembayaran Anda
                    secepat mungkin. Anda dapat mengecek berkala untuk perubahan status.
                </DialogDescription>
                <DialogActions>
                    <Button
                        plain
                        onClick={() => {
                            setIsOpen(false);
                            router.push("/dashboard/subscription"); // TODO: Redirect to subscription page
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
