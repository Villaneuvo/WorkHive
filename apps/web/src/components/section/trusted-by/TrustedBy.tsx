import { Container } from "@/components/Container";
import Image from "next/image";
import { companyLogos } from "@/utils/company-logo";

export default function TrustedBy() {
    return (
        <section className="py-10 sm:py-20">
            <Container>
                {/* Header */}
                <div className="mx-auto mb-10 max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                        Dipercaya oleh 100 lebih perusahaan yang menanti talenta terbaik seperti anda
                    </h2>
                </div>
                <div className="flex flex-wrap">
                    {companyLogos.map((company) => (
                        <div key={company.name} className="flex w-1/5 items-center justify-center p-4">
                            <Image src={company.src} alt={company.alt} width={120} height={60} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
