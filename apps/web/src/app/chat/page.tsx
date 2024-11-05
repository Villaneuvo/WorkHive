"use client";
import ChatWrapper from "@/components/chat/ChatWrapper";
import Footer from "@/components/section/footer/Footer";
import Header from "@/components/section/header/Header";

export default function UserChatPage() {
    return (
        <>
            <Header />
            <div className="container py-10">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-12 w-full overflow-hidden rounded-xl border-t shadow-md">
                        <ChatWrapper maxHeigh="70vh" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
