"use client";
import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import socket from "@/utils/socket";
import { useSession } from "next-auth/react";
import { getPublicProfile } from "@/utils/service/user";
import { getChatHistory, storeUserChat } from "@/utils/service/chat";
import Image from "next/image";

const OnlineComponent = () => (
    <div className="mt-1 flex items-center gap-x-1.5">
        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
        <p className="text-xs leading-5 text-gray-500">Online</p>
    </div>
);

type chatAreaProps = {
    maxHeigh?: string;
    recipientId: number;
    revalidate?: () => void;
};

function scrollToBottom() {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
        chatContainer.scrollTo({
            top: chatContainer.scrollHeight,
            behavior: "smooth",
        });
    }
}

export default function ChatArea({ maxHeigh = "", recipientId, revalidate = () => {} }: chatAreaProps) {
    const { data: session } = useSession();
    const userId = session?.user?.id || "";
    const [message, setMessage] = useState("");
    const [receiverDetails, setReceiverDetails] = useState<any>({});
    const [pesanDiterima, setPesanDiterima] = useState<
        Array<{
            message: string;
            time: string;
            isme: boolean;
            status: string;
        }>
    >([]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    const handleGetProfile = async (id: number) => {
        try {
            const response = await getPublicProfile(id);
            if (response?.user) {
                setReceiverDetails(response.user);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleGetChatHistory = async (senderId: number, recipientId: number) => {
            try {
                const response = await getChatHistory({ senderId, recipientId });
                if (response?.data) {
                    setPesanDiterima(
                        response.data.map((item: any) => ({
                            message: item.message,
                            time: new Date(item.timestamp).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            }),
                            isme: item.senderId === userId,
                            status: item.status,
                        })),
                    );
                    setTimeout(() => {
                        scrollToBottom();
                    }, 100);
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (recipientId) {
            handleGetProfile(recipientId);
            handleGetChatHistory(Number(userId), recipientId);
        }
    }, [recipientId, userId]);
    useEffect(() => {
        //emit event messageRead
        socket.emit("messageRead", { senderId: userId, recipientId });
    }, [message, recipientId, userId]);

    useEffect(() => {
        if (userId) {
            socket.emit("register", userId);
        }

        socket.on("receive_message", (data) => {
            revalidate();
            const pesanbaru = {
                message: data.message,
                time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
                isme: data.senderId === userId,
                status: "baca",
            };
            //set all previous message status to read and add new message
            setPesanDiterima((prev: any) => {
                const newPesan = [...prev];
                if (prev.length > 0) {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage.isme) {
                        newPesan[prev.length - 1] = {
                            ...lastMessage,
                            status: "dibaca",
                        };
                    }
                }
                return [...newPesan, pesanbaru];
            });
            setTimeout(() => {
                scrollToBottom();
            }, 1000);
        });

        socket.on("messageRead", (data) => {
            const receiptid = data.recipientId;
            console.log(`Pesan dari ${userId} ke ${receiptid} sudah dibaca.`);
            //pesan dari pengirim sudah dibaca
            setPesanDiterima((prev: any) =>
                prev.map((item: any) => {
                    if (!item.isme && item.status === "terkirim") {
                        return {
                            ...item,
                            status: "dibaca",
                        };
                    }
                    return item;
                }),
            );
        });

        return () => {
            socket.off("receive_message");
            socket.off("messageRead");
        };
    }, [userId, revalidate]);

    const handleStoreChat = async (data: { recipientId: number; message: string; senderId: number }) => {
        try {
            await storeUserChat(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newmessage = message.trim();
        if (!recipientId) {
            return alert("user id penerima belum diset");
        }
        if (newmessage) {
            const data = {
                recipientId,
                message: newmessage,
                senderId: userId,
            };
            socket.emit("send_message", data);
            setPesanDiterima((prev: any) => [
                ...prev,
                {
                    message: newmessage,
                    time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
                    isme: true,
                    status: "terkirim",
                },
            ]);
            handleStoreChat({
                recipientId,
                message: newmessage,
                senderId: Number(userId),
            });
            setTimeout(() => {
                scrollToBottom();
            }, 100);
            setMessage("");
            revalidate();
        }
    };

    const handleGetChatHistory = async (senderId: number, recipientId: number) => {
        try {
            const response = await getChatHistory({ senderId, recipientId });
            if (response?.data) {
                setPesanDiterima(
                    response.data.map((item: any) => ({
                        message: item.message,
                        time: new Date(item.timestamp).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        }),
                        isme: item.senderId === userId,
                        status: item.status,
                    })),
                );
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={clsx("col-span-9 flex flex-col")}
            style={{
                maxHeight: maxHeigh ? maxHeigh : "calc(100vh-64px)",
            }}
        >
            {!recipientId ? (
                <div className="flex h-full w-full items-center justify-center">
                    <p className="text-lg text-gray-500">Select a chat to start messaging</p>
                </div>
            ) : (
                <>
                    <div className="sticky top-0 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
                        <div className="flex items-center gap-x-4">
                            <Image
                                height={32}
                                width={32}
                                alt=""
                                src={receiverDetails?.photoUrl}
                                className="h-8 w-8 rounded-full bg-gray-50"
                            />
                            <div className="space-y-0">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{receiverDetails?.name}</p>
                                <OnlineComponent />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col overflow-y-scroll">
                        <div className="chat-container flex-1 overflow-y-auto scroll-smooth p-4">
                            <div className="flex flex-col justify-end gap-2">
                                {pesanDiterima.map((item: any, index: number) => (
                                    <ChatItem
                                        message={item.message}
                                        time={item.time}
                                        isme={item.isme}
                                        status={item.status}
                                        key={index}
                                        className={index === pesanDiterima.length - 1 ? "last-chat" : ""}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="bg-primary-dark px-4 py-2 text-white">
                            <form className="flex w-full" onSubmit={handleSubmit}>
                                <input
                                    value={message}
                                    placeholder="Type a message"
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
                </>
            )}
        </div>
    );
}
