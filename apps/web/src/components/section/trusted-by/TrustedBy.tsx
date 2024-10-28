import { Container } from "@/components/Container";
import Image from "next/image";

const companyLogos = [
    {
        name: "Astra",
        src: "/company-icon/astra.png",
        alt: "Astra logo",
    },
    {
        name: "AWS",
        src: "/company-icon/aws.png",
        alt: "AWS logo",
    },
    {
        name: "Carrefour",
        src: "/company-icon/carrefour.png",
        alt: "Carrefour logo",
    },
    {
        name: "Dell",
        src: "/company-icon/dell.png",
        alt: "Dell logo",
    },
    {
        name: "Google",
        src: "/company-icon/google.png",
        alt: "Google logo",
    },
    {
        name: "Mcd",
        src: "/company-icon/mcd.png",
        alt: "Mcd logo",
    },
    {
        name: "P & G",
        src: "/company-icon/pandg.png",
        alt: "P&G logo",
    },
    {
        name: "SCTV Indosiar",
        src: "/company-icon/SCTV.png",
        alt: "SCTV Indosiar logo",
    },
    {
        name: "Toto",
        src: "/company-icon/toto.jpg",
        alt: "Toto logo",
    },
    {
        name: "Ultra Sakti Group",
        src: "/company-icon/ultrasakti.png",
        alt: "Ultra Sakti logo",
    },
];

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
