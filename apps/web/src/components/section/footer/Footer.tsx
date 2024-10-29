import Image from "next/image";
import Link from "next/link";

const jobseeker = [
    { name: "Pricing", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Rekomendasi Karir", href: "#" },
    { name: "Jobseeker Guide", href: "#" },
];

const employers = [
    { name: "Buka Lowongan", href: "#" },
    { name: "Employer Guide", href: "#" },
];

const workHive = [
    { name: "Tentang Kami", href: "#" },
    { name: "Syarat dan Ketentuan", href: "#" },
    { name: "Frequently Ask Question", href: "#" },
    { name: "Rekomendasi Lowongan", href: "#" },
];

const socialMedia = [
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
];

export const Footer = () => {
    return (
        <footer aria-labelledby="footer-heading" className="border-t-2 border-gray-900/15 bg-white">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <div className="max-w-8xl mx-auto px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Image
                            src="/logo.svg"
                            alt="WorkHive Logo"
                            width={240}
                            height={240}
                            className="rounded-sm bg-white object-contain"
                        />
                        <p className="text-sm leading-6 text-gray-600">Your Gateway to Career Success.</p>
                        <div className="pb-2 text-xs text-gray-700">
                            <p className="leading-relaxed">
                                Layanan Pengaduan Konsumen <br />
                                PT KOKARP TECH INDONESIA <br />
                                Email :{" "}
                                <Link href="mailto:support@workhive.com" className="hover:underline">
                                    {" "}
                                    support@workhive.com{" "}
                                </Link>{" "}
                                <br />
                                Tel : 087701802324
                            </p>
                            <br />
                            <p className="max-w-72 leading-relaxed">
                                Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga Kementerian Perdagangan
                                Republik Indonesia <br /> Tel : 0853-1111-1010 (WhatsApp)
                            </p>
                            <br />
                            <span>&copy; 2024 WorkHive.com</span>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-bold leading-6 text-gray-900">WorkHive</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {workHive.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="hover:text-reseda-green group text-sm leading-6 text-gray-600 transition delay-100 duration-300"
                                            >
                                                {item.name}
                                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-40"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-base font-bold leading-6 text-gray-900">Jobseeker</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {jobseeker.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="hover:text-reseda-green group text-sm leading-6 text-gray-600 transition delay-100 duration-300"
                                            >
                                                {item.name}
                                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-32"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-base font-bold leading-6 text-gray-900">Employer</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {employers.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="hover:text-reseda-green group text-sm leading-6 text-gray-600 transition delay-100 duration-300"
                                            >
                                                {item.name}
                                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-28"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-base font-bold leading-6 text-gray-900">Ikuti Kami</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {socialMedia.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="hover:text-reseda-green group w-fit text-sm leading-6 text-gray-600 transition delay-100 duration-300"
                                            >
                                                {item.name}
                                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-16"></span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
