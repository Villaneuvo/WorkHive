"use client";

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from "@headlessui/react";
import {
    Bars3Icon,
    BuildingOfficeIcon,
    ChevronDownIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileHeader from "./MobileHeader";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const leftNavigation = {
    jobseeker: [
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
    ],
    webFeature: [
        { name: "Pricing", href: "#" },
        { name: "Testimonials", href: "#" },
    ],
};

const rightNavigation = [
    { name: "Sign in", href: "/login" },
    { name: "Sign up", href: "/register" },
];

const userNavigation = [
    { name: "Chat", href: "/chat" },
    { name: "Sign out", href: "/" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    // show user session
    const { data: session, status } = useSession();

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" }); // Redirect to the login page after sign-out
    };
    return (
        <header className={`${!isOpen ? "shadow-[rgba(0,0,15,0.15)_0px_2px_4px_0px]" : "none"} py-2`}>
            <nav className="max-w-8xl mx-auto flex justify-between px-6 py-0 text-sm text-gray-700 lg:px-8">
                <div className="flex items-center">
                    <Link href={"/"}>
                        <Image src="/logo.svg" alt="logo" width={120} height={120} />
                    </Link>

                    <PopoverGroup className="hidden lg:flex lg:gap-x-8">
                        <Popover className="relative">
                            <PopoverButton className="hover:text-reseda-green group flex items-center rounded-md p-2 leading-6 transition delay-100 duration-300 hover:bg-gray-200">
                                For Jobseeker
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-500 group-data-[open]:rotate-180" />
                            </PopoverButton>

                            <PopoverPanel
                                className="absolute -left-8 top-full z-10 mt-5 w-screen max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                transition
                            >
                                <div className="p-4">
                                    {leftNavigation.jobseeker.map((item) => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-4 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        >
                                            <div>
                                                <item.image className="text-reseda-green h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col gap-y-2">
                                                <Link href={item.href} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                </Link>
                                                <span className="text-xs">{item.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Popover>

                        {leftNavigation.webFeature.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="hover:text-reseda-green group p-2 transition duration-300"
                            >
                                {item.name}
                                <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
                            </Link>
                        ))}
                    </PopoverGroup>
                </div>

                <div className="flex items-center gap-x-8">
                    <Link href="#" className="hover:text-reseda-green group hidden transition duration-300 lg:block">
                        For Employers
                        <span className="bg-reseda-green block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
                    </Link>
                    {status === "authenticated" ? (
                        <Menu as="div" className="relative">
                            <MenuButton className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    className="h-8 w-8 rounded-full bg-gray-50"
                                />
                                <span className="hidden lg:flex lg:items-center">
                                    <span
                                        aria-hidden="true"
                                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                    >
                                        {session?.user?.name}
                                    </span>
                                    <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                                </span>
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                {userNavigation.map((item) => (
                                    <MenuItem key={item.name}>
                                        {item.name === "Sign out" ? (
                                            <button
                                                onClick={handleSignOut}
                                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                            >
                                                {item.name}
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                            >
                                                {item.name}
                                            </Link>
                                        )}
                                    </MenuItem>
                                ))}
                            </MenuItems>
                        </Menu>
                    ) : (
                        <>
                            {rightNavigation.map((item) => (
                                <Link
                                    className={`${item.name === "Sign in" ? "text-reseda-green rounded-md px-4 py-2 transition delay-100 duration-300 hover:bg-gray-200" : item.name === "Sign up" ? "transititon bg-reseda-green hover:bg-reseda-green/75 rounded-md px-4 py-2 text-white delay-100 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" : "hover:text-reseda-green group transition duration-300 hover:underline hover:underline-offset-4"}`}
                                    key={item.name}
                                    href={item.href}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </>
                    )}
                    <div className="flex lg:hidden">
                        <button type="button" onClick={() => setIsOpen(true)}>
                            {!isOpen ? (
                                <Bars3Icon className="animate-pulse-once h-6 w-6 text-gray-700" />
                            ) : (
                                <XMarkIcon className={`${isOpen ? "animate-spin-once" : ""} h-6 w-6 text-gray-700`} />
                            )}
                        </button>
                    </div>
                </div>
                {isOpen && <MobileHeader open={isOpen} setIsOpen={setIsOpen} />}
            </nav>
        </header>
    );
}
