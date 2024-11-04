import ApplyJobForm from "@/components/form/apply-job/ApplyJobForm";
import Image from "next/image";

export default function ApplyJobPage() {
    return (
        <div className="container my-5">
            <div className="grid grid-cols-2 gap-10">
                <div className="flex h-full items-center justify-center">
                    <Image src="/ilustration/reminder.png" alt="Job" width={350} height={350} layout="intrinsic" />
                </div>
                <div>
                    <div className="mb-5">
                        <h1 className="text-2xl font-bold">Judul Job</h1>
                        <p>Deskripsi Job</p>
                    </div>
                    <ApplyJobForm />
                </div>
            </div>
        </div>
    );
}
