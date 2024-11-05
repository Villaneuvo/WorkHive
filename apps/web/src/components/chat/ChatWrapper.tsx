"use client";
import React, { useEffect, useState } from "react";
import ChatList from "@/components/chat/ChatList";
import ChatArea from "@/components/chat/ChatArea";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { getChatHistory, getChatList } from "@/utils/service/chat";
import { useSession } from "next-auth/react";

type ChatWrapperProps = {
    maxHeigh?: string;
};

export default function ChatWrapper({ maxHeigh = "" }: ChatWrapperProps) {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { data: session } = useSession();
    const [list, setList] = useState([]);

    const handleGetChatHistory = async (senderId: number, recipientId: number) => {
        try {
            const response = await getChatHistory({
                senderId,
                recipientId,
            });
            if (response?.data) {
                // setChatList(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetList = async (token: string) => {
        try {
            const response = await getChatList(token);
            // console.log(response);
            if (response?.data) {
                setList(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (session?.user?.id) {
            handleGetChatHistory(session?.user?.id ? Number(session.user.id) : 0, Number(id));
            handleGetList(session?.user?.token || "");
        }
    }, [session?.user?.id, id, session?.user?.token]);

    return (
        <div
            className={clsx("grid grid-cols-12 overflow-hidden")}
            style={{
                maxHeight: maxHeigh ? maxHeigh : "calc(100vh-64px)",
                minHeight: maxHeigh ? maxHeigh : "calc(100vh-64px)",
            }}
        >
            <ChatList maxHeigh={maxHeigh} list={list || []} />
            <ChatArea maxHeigh={maxHeigh} recipientId={Number(id)} />
        </div>
    );
}
