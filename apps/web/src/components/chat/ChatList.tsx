"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type ChatListProps = {
    list: Array<{
        recipient: {
            id: number;
            photoUrl: string;
            name: string;
        };
        message: string;
    }>;
    maxHeigh?: string;
    onClick?: () => void;
};

const OnlineComponent = () => (
    <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
);

export default function ChatList({ list, maxHeigh }: ChatListProps) {
    const router = useRouter();

    return (
        <div
            className={clsx("col-span-3 overflow-y-scroll border-r border-gray-300")}
            style={{
                maxHeight: maxHeigh ? maxHeigh : "calc(100vh-64px)",
            }}
        >
            <ul role="list" className="divide-y divide-gray-100">
                {list.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            router.replace("/chat?id=" + item.recipient.id);
                        }}
                        className="flex justify-between gap-x-6 py-4 pl-4 hover:cursor-pointer hover:bg-gray-200"
                    >
                        <div className="flex min-w-0 gap-x-4">
                            <img
                                alt=""
                                src={item.recipient.photoUrl}
                                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            />
                            <div className="space-y-0">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.recipient.name}</p>
                                <p className="mt-1 text-xs leading-5 text-gray-500">
                                    {item.message.length > 30 ? item.message.slice(0, 30) + "..." : item.message}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
