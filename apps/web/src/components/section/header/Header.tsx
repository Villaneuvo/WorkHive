"use client";

import Link from "next/link";
import { Popover, PopoverButton, PopoverBackdrop, PopoverPanel, PopoverGroup } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

// function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
//     return (
//         <PopoverButton as={Link} href={href} className="block w-full p-2">
//             {children}
//         </PopoverButton>
//     );
// }

// function MobileNavIcon({ open }: { open: boolean }) {
//     return (
//         <svg
//             aria-hidden="true"
//             className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
//             fill="none"
//             strokeWidth={2}
//             strokeLinecap="round"
//         >
//             <path
//                 d="M0 1H14M0 7H14M0 13H14"
//                 className={clsx('origin-center transition', open && 'scale-90 opacity-0')}
//             />
//             <path
//                 d="M2 2L12 12M12 2L2 12"
//                 className={clsx('origin-center transition', !open && 'scale-90 opacity-0')}
//             />
//         </svg>
//     );
// }

// function MobileNavigation() {
//     return (
//         <Popover>
//             <PopoverButton
//                 className="ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center"
//                 aria-label="Toggle Navigation"
//             >
//                 {({ open }) => <MobileNavIcon open={open} />}
//             </PopoverButton>
//             <PopoverBackdrop
//                 transition
//                 className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
//             />
//             <PopoverPanel
//                 transition
//                 className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
//             >
//                 <MobileNavLink href="#features">Features</MobileNavLink>
//                 <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
//                 <MobileNavLink href="#pricing">Pricing</MobileNavLink>
//                 <hr className="m-2 border-slate-300/40" />
//                 <MobileNavLink href="/login">Sign in</MobileNavLink>
//             </PopoverPanel>
//         </Popover>
//     );
// }

const leftNavigation = {
    jobseeker: [
        { image: "", name: "Cari Lowongan ", href: "#" },
        { image: "", name: "Cari Perusahaan", href: "#" },
    ],
    webFeature: [
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#" },
    ],
};

const rightNavigation = [
    { name: "For Employers", href: "/employers" },
    { name: "Sign in", href: "/login" },
    { name: "Sign up", href: "/register" },
];

export default function Header() {
    return (
        <header className="py-10">
            <nav className="max-w-8xl mx-auto flex justify-between text-sm text-gray-700">
                <div className="flex items-center">
                    <Link href={"#"}>
                        <Image src="/logo.svg" alt="logo" width={120} height={120} />
                    </Link>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-8">
                        <Popover>
                            <PopoverButton className="flex items-center">
                                For Jobseeker
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-500" />
                            </PopoverButton>

                            <PopoverPanel transition>
                                <div className="p-4">
                                    {leftNavigation.jobseeker.map((item) => (
                                        <div key={item.name}>
                                            <Link href={item.href}>{item.name}</Link>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>

                        {leftNavigation.webFeature.map((item) => (
                            <Link key={item.name} href={item.href}>
                                {item.name}
                            </Link>
                        ))}
                    </PopoverGroup>
                </div>

                <div className="flex items-center gap-x-8">
                    {rightNavigation.map((item) => (
                        <Link
                            className={`${item.name === "Sign in" ? "text-reseda-green" : item.name === "Sign up" ? "transititon bg-reseda-green hover:bg-reseda-green/75 rounded-md px-4 py-2 text-white delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" : ""}`}
                            key={item.name}
                            href={item.href}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </nav>
        </header>
    );
}
