"use client";

import FAQ from "@/components/section/FAQ/FAQ";
import { Footer } from "@/components/section/footer/Footer";
import Header from "@/components/section/header/Header";
import Hero from "@/components/section/hero/Hero";
import JobDiscovery from "@/components/section/job-discovery/JobDiscovery";
import TrustedBy from "@/components/section/trusted-by/TrustedBy";
import WhyUs from "@/components/section/why-us-feature/WhyUs";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
    return (
        <Provider store={store}>
            <Header />
            <Hero />
            <WhyUs />
            <TrustedBy />
            <JobDiscovery />
            <FAQ />
            <Footer />
        </Provider>
    );
}
