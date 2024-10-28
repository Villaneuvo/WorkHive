import Hero from "@/components/section/hero/Hero";
import TrustedBy from "@/components/section/trusted-by/TrustedBy";
import WhyUs from "@/components/section/why-us-feature/WhyUs";

export default function Home() {
    return (
        <main>
            <Hero />
            <WhyUs />
            <TrustedBy />
        </main>
    );
}
