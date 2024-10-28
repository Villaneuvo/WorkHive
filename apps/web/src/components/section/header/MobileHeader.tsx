import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { BuildingOfficeIcon, ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
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

const navigation = [
    { name: "Pricing", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "For Employers", href: "#" },
];

export default function MobileHeader({
    open,
    setIsOpen,
}: {
    open: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Dialog open={open} onClose={() => setIsOpen(false)} className="relative z-10">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <DialogPanel
                    transition
                    className="flex translate-y-24 flex-col bg-white px-6 py-4 text-sm text-gray-700 shadow-[rgba(0,0,15,0.15)_0px_8px_4px_0px]"
                >
                    <Disclosure as="div" className="">
                        <DisclosureButton className="hover:text-reseda-green group flex w-full items-center justify-between p-5 delay-100 duration-300 hover:bg-gray-50 focus:outline-none">
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
                        {navigation.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="hover:text-reseda-green group p-5 transition duration-300 hover:bg-gray-50"
                            >
                                {item.name}
                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-24"></span>
                            </Link>
                        ))}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}
