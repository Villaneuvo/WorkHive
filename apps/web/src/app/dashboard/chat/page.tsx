import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import React from "react";
import clsx from "clsx";
const people = [
    {
        name: "Leslie Alexander",
        email: "leslie.alexander@example.com",
        role: "Co-Founder / CEO",
        imageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
        name: "Michael Foster",
        email: "michael.foster@example.com",
        role: "Co-Founder / CTO",
        imageUrl:
            "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
        name: "Dries Vincent",
        email: "dries.vincent@example.com",
        role: "Business Relations",
        imageUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: null,
    },
    {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        role: "Front-end Developer",
        imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        role: "Designer",
        imageUrl:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
    {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        role: "Director of Product",
        imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: null,
    },
    {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        role: "Director of Product",
        imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: null,
    },
    {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        role: "Director of Product",
        imageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: null,
    },
    {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        role: "Front-end Developer",
        imageUrl:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        lastSeen: "3h ago",
        lastSeenDateTime: "2023-01-23T13:23Z",
    },
];
const OnlineComponent = () => (
    <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
);
const ChatItem = ({ isme = true }: { isme?: boolean }) => (
    <div className={clsx("flex h-fit w-full gap-2.5", isme ? "flex-row-reverse" : "flex-row")}>
        <div className={clsx("flex items-start gap-4", isme ? "flex-row-reverse justify-end" : "justify-start")}>
            {/* {!isme && (
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full bg-gray-50"
                />
            )} */}
            <div
                className={clsx(
                    "leading-1.5 flex w-full max-w-[320px] flex-col border-gray-200 bg-gray-100 p-4",
                    isme ? "rounded-s-xl rounded-ee-xl" : "rounded-e-xl rounded-es-xl",
                )}
            >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {/* <span className="text-sm font-semibold text-gray-900">Bonnie Green</span> */}
                    <span className="text-xs font-normal text-gray-500">11:46</span>
                </div>
                <p className="py-2.5 text-sm font-normal text-gray-900">
                    That's awesome. I think our users will really appreciate the improvements.
                </p>
                <span className="text-right text-xs font-normal text-gray-500">Delivered</span>
            </div>
        </div>
    </div>
);
export default function ChatPage() {
    return (
        <div className="grid max-h-[calc(100vh-64px)] grid-cols-12 overflow-hidden">
            {/* List User */}
            <div className="col-span-3 max-h-[calc(100vh-64px)] overflow-y-scroll border-r border-gray-300">
                <ul role="list" className="divide-y divide-gray-100">
                    {people.map((person) => (
                        <li
                            key={person.email}
                            className="flex justify-between gap-x-6 py-4 pl-4 hover:cursor-pointer hover:bg-gray-200"
                        >
                            <div className="flex min-w-0 gap-x-4">
                                <img
                                    alt=""
                                    src={person.imageUrl}
                                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                />
                                <div className="space-y-0">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                    {person.lastSeen ? (
                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                        </p>
                                    ) : (
                                        <OnlineComponent />
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Chat Area */}
            <div className="col-span-9 flex max-h-[calc(100vh-64px)] flex-col">
                {/* Chat Header */}
                <div className="sticky top-0 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
                    <div className="flex items-center gap-x-4">
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-8 w-8 rounded-full bg-gray-50"
                        />
                        <div className="space-y-0">
                            <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                            <OnlineComponent />
                        </div>
                    </div>
                </div>
                {/* Chat Content */}
                <div className="flex flex-1 flex-col overflow-y-scroll">
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="flex flex-col justify-end gap-2">
                            <ChatItem isme={false} />
                            <ChatItem isme={false} />
                            <ChatItem isme={false} />
                            <ChatItem isme={false} />
                            <ChatItem isme={false} />
                            <ChatItem />
                        </div>
                    </div>
                    <div className="bg-primary-dark flex px-4 py-2 text-white">
                        <input className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6" />
                        <button className="px-4 py-2 text-white">
                            <PaperAirplaneIcon className="h-7 w-7" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
