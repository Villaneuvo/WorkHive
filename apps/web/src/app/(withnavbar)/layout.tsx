import Header from "@/components/section/header/Header";
import { Footer } from "@/components/section/footer/Footer";
export default async function WithNavbarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
