"use client";
import React from "react";
import clsx from "clsx";
type ChatItemProps = {
    isme?: boolean;
    message: string;
    time: string;
    status: string;
    className?: string;
};
export default function ChatItem({ isme = true, message, time, status, className }: ChatItemProps) {
    return (
        <div className={clsx("flex h-fit w-full gap-2.5", isme ? "flex-row-reverse" : "flex-row", className)}>
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
                        <span className="text-xs font-normal text-gray-500">{time}</span>
                    </div>
                    <p className="py-2.5 text-sm font-normal text-gray-900">{message}</p>
                    <span className="text-right text-xs font-normal text-gray-500">{status}</span>
                </div>
            </div>
        </div>
    );
}
