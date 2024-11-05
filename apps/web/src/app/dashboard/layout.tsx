"use client";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
    Bars3Icon,
    CalendarIcon,
    ChatBubbleBottomCenterTextIcon,
    HomeIcon,
    UserIcon,
    XMarkIcon,
    BriefcaseIcon,
    DocumentIcon,
    GiftTopIcon,
    StarIcon,
    DocumentDuplicateIcon,
    BookmarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true, role: ["ADMIN", "USER", "DEVELOPER"] },
    {
        name: "Interview Schedule",
        href: "/dashboard/interview-schedule",
        icon: CalendarIcon,
        current: false,
        role: ["ADMIN"],
    },
    {
        name: "Chat",
        href: "/dashboard/chat",
        icon: ChatBubbleBottomCenterTextIcon,
        current: false,
        role: ["ADMIN", "USER", "DEVELOPER"],
    },
    {
        name: "Subscription",
        href: "/dashboard/subscription",
        icon: StarIcon,
        current: false,
        role: ["USER"],
    },
    {
        name: "Saved Jobs",
        href: "/dashboard/saved-jobs",
        icon: BookmarkIcon,
        current: false,
        role: ["USER"],
    },
    { name: "Endorse Friend", href: "/dashboard/endorsement", icon: GiftTopIcon, current: false, role: ["USER"] },
    { name: "Manage Job Posts", href: "/dashboard/manage-jobs", icon: BriefcaseIcon, current: false, role: ["ADMIN"] },
    {
        name: "Manage Subscriptions",
        href: "/dashboard/manage-subscriptions",
        icon: ChatBubbleBottomCenterTextIcon,
        current: false,
        role: ["DEVELOPER"],
    },
    { name: "CV Generator", href: "/dashboard/cv-generator", icon: DocumentIcon, current: false, role: ["USER"] },
    {
        name: "Certificates List",
        href: "/dashboard/certificates",
        icon: DocumentDuplicateIcon,
        current: false,
        role: ["USER"],
    },
];

const menuNavigation = [{ name: "Sign out", href: "/" }];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();

    const adminNavigation = navigation.filter((item) => item.role.includes("ADMIN"));
    const userNavigation = navigation.filter((item) => item.role.includes("USER"));
    const developerNavigation = navigation.filter((item) => item.role.includes("DEVELOPER"));

    const isActive = (pathname: string) => {
        return currentPath === pathname;
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <>
            <div>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(false)}
                                        className="-m-2.5 p-2.5"
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>
                            {/* Sidebar component, swap this element with another sidebar if you like */}
                            <div className="bg-primary-dark flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
                                <div className="flex h-16 shrink-0 items-center justify-center">
                                    <Image alt="JobTalk" src="/logo.svg" width={200} height={200} />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={clsx(
                                                                isActive(item.href)
                                                                    ? "text-primary-dark bg-gray-50"
                                                                    : "hover:bg-primary text-gray-300 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={clsx(
                                                                    isActive(item.href)
                                                                        ? "text-primary-dark"
                                                                        : "text-gray-300 group-hover:text-white",
                                                                    "h-6 w-6 shrink-0",
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="bg-primary-dark flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 pb-4">
                        <div className="my-5 flex h-16 shrink-0 items-center justify-center">
                            <Link href={"/"}>
                                <Image
                                    src="/logo.svg"
                                    alt="WorkHive Logo"
                                    width={240}
                                    height={240}
                                    className="rounded-md bg-white object-contain"
                                />
                            </Link>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {session?.user?.role === "ADMIN" ? (
                                            <>
                                                {adminNavigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={clsx(
                                                                isActive(item.href)
                                                                    ? "text-primary-dark bg-gray-50"
                                                                    : "hover:bg-primary text-gray-300 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={clsx(
                                                                    isActive(item.href)
                                                                        ? "text-primary-dark"
                                                                        : "text-gray-300 group-hover:text-white",
                                                                    "h-6 w-6 shrink-0",
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </>
                                        ) : session?.user?.role === "DEVELOPER" ? (
                                            <>
                                                {developerNavigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={clsx(
                                                                isActive(item.href)
                                                                    ? "text-primary-dark bg-gray-50"
                                                                    : "hover:bg-primary text-gray-300 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={clsx(
                                                                    isActive(item.href)
                                                                        ? "text-primary-dark"
                                                                        : "text-gray-300 group-hover:text-white",
                                                                    "h-6 w-6 shrink-0",
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                {userNavigation.map((item) => (
                                                    <li key={item.name}>
                                                        <Link
                                                            href={item.href}
                                                            className={clsx(
                                                                isActive(item.href)
                                                                    ? "text-primary-dark bg-gray-50"
                                                                    : "hover:bg-primary text-gray-300 hover:text-white",
                                                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                                                            )}
                                                        >
                                                            <item.icon
                                                                aria-hidden="true"
                                                                className={clsx(
                                                                    isActive(item.href)
                                                                        ? "text-primary-dark"
                                                                        : "text-gray-300 group-hover:text-white",
                                                                    "h-6 w-6 shrink-0",
                                                                )}
                                                            />
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="relative flex flex-1"></div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <Image
                                            alt=""
                                            width={32}
                                            height={32}
                                            src="https://res.cloudinary.com/dkcur9nvf/image/upload/v1730362532/g6pjkjaipvie2rsz2lsk.jpg"
                                            className="h-8 w-8 rounded-full bg-gray-50"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                aria-hidden="true"
                                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            >
                                                {session?.user?.name}
                                            </span>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className="ml-2 h-5 w-5 text-gray-400"
                                            />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-5 w-32 max-w-sm overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {menuNavigation.map((item) => (
                                            <MenuItem key={item.name}>
                                                <Link
                                                    href={"#"}
                                                    onClick={handleSignOut}
                                                    className="group relative flex items-center gap-x-4 p-4 text-sm font-medium leading-6 text-gray-900 hover:bg-gray-50"
                                                >
                                                    {item.name}
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="">{children}</main>
                </div>
            </div>
        </>
    );
}
