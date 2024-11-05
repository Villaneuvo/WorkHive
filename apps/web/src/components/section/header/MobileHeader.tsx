import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BuildingOfficeIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const jobSeekerNavigation = [
    {
        image: MagnifyingGlassIcon,
        alt: "a magnifier icon",
        name: "Cari Lowongan",
        desc: "Temukan lowongan impian dari berbagai industri",
        href: "#",
    },
    {
        image: BuildingOfficeIcon,
        alt: "an office building icon",
        name: "Cari Perusahaan",
        desc: "Temukan lowongan dari perusahaan impianmu",
        href: "#",
    },
];

export default function MobileHeader({
    open,
    setIsOpen,
}: {
    open: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { data: session, status } = useSession();
    return (
        <Dialog open={open} onClose={() => setIsOpen(false)} className="relative z-10">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <DialogPanel
                    transition
                    className="flex translate-y-24 flex-col bg-white px-6 py-4 text-sm text-gray-700 shadow-[rgba(0,0,15,0.15)_0px_8px_4px_0px]"
                >
                    <Disclosure as="div" className="">
                        <DisclosureButton className="hover:text-reseda-green group flex w-full items-center justify-between p-5 delay-100 duration-300 hover:bg-gray-50">
                            For Jobseeker
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                            />
                        </DisclosureButton>
                        <DisclosurePanel className="">
                            {jobSeekerNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="flex flex-row rounded-lg py-2 pl-6 pr-3 text-sm text-gray-700 delay-100 duration-300 hover:bg-gray-50"
                                >
                                    <div className="mr-5">
                                        <item.image className="text-reseda-green h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <Link href={item.href} className="block font-semibold text-gray-900">
                                            {item.name}
                                        </Link>
                                        <span className="text-xs">{item.desc}</span>
                                    </div>
                                </DisclosureButton>
                            ))}
                        </DisclosurePanel>
                    </Disclosure>

                    <div className="flex flex-col">
                        <Link
                            href={status === "authenticated" ? "/dashboard/subscription" : "/login"}
                            className="hover:text-reseda-green group p-5 transition duration-300 hover:bg-gray-50"
                        >
                            Pricing
                            <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-24"></span>
                        </Link>
                        <Link
                            href={"/skill-assessment"}
                            className="hover:text-reseda-green group p-5 transition duration-300 hover:bg-gray-50"
                        >
                            Skill Assessment
                            <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-24"></span>
                        </Link>
                        {status === "authenticated" ? null : (
                            <Link
                                href="/admin-register"
                                className="hover:text-reseda-green group p-5 transition duration-300 hover:bg-gray-50"
                            >
                                For Employers
                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-24"></span>
                            </Link>
                        )}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
