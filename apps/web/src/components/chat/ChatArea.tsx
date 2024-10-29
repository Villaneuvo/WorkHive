"use client";
import React, { useEffect } from "react";
import ChatItem from "./ChatItem";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
const OnlineComponent = () => (
    <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
);
type ChatListProps = {
    maxHeigh?: string;
};
const chatList = [
    {
        message: "Hey, how are you?",
        time: "10:00",
        isme: true,
        status: "read",
    },
    {
        message: "I'm fine, thank you",
        time: "10:01",
        isme: false,
        status: "read",
    },
    {
        message: "I'm fine, thank you",
        time: "10:01",
        isme: false,
        status: "read",
    },
    {
        message: "I'm fine, thank you",
        time: "10:01",
        isme: false,
        status: "read",
    },
    {
        message: "What are you doing?",
        time: "10:02",
        isme: true,
        status: "delivered",
    },
];
function scrollToBottom() {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth",
        });
    }
}
export default function ChatArea({ maxHeigh = "" }: ChatListProps) {
    const [message, setMessage] = React.useState("");
    useEffect(() => {
        scrollToBottom();
    }, []);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newmessage = message.trim();
        if (newmessage) {
            chatList.push({
                message: newmessage,
                time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
                isme: true,
                status: "delivered",
            });
            setTimeout(() => {
                scrollToBottom();
            }, 100);
            setMessage("");
        }
    };
    return (
        <div
            className={clsx("col-span-9 flex flex-col")}
            style={{
                maxHeight: maxHeigh ? maxHeigh : "calc(100vh-64px)",
            }}
        >
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
                <div className="chat-container flex-1 overflow-y-auto scroll-smooth p-4">
                    <div className="flex flex-col justify-end gap-2">
                        {chatList.map((item, index) => (
                            <ChatItem
                                message={item.message}
                                time={item.time}
                                isme={item.isme}
                                status={item.status}
                                key={index}
                                className={index === chatList.length - 1 ? "last-chat" : ""}
                            />
                        ))}
                    </div>
                </div>
                <div className="bg-primary-dark px-4 py-2 text-white">
                    <form className="flex w-full" onSubmit={handleSubmit}>
                        <input
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-500 placeholder:opacity-70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-transparent sm:text-sm sm:leading-6"
                        />
                        <button type="submit" className="px-4 py-2 text-white">
                            <PaperAirplaneIcon className="h-7 w-7" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
