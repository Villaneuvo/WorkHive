"use client";
import ChatWrapper from "@/components/chat/ChatWrapper";
export default function UserChatPage() {
    return (
        <div className="container py-10">
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 w-full overflow-hidden rounded-xl border-t shadow-md">
                    <ChatWrapper maxHeigh="70vh" />
                </div>
            </div>
        </div>
    );
}
