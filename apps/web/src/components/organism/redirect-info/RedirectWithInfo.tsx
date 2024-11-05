"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function RedirectWithInfo({ time, url }: { time: number; url: string }) {
    const router = useRouter();
    const [count, setCount] = React.useState(time / 1000);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);
        setTimeout(() => {
            router.replace(url);
        }, time);
        return () => clearInterval(interval);
    }, [time, router, url]);
    return (
        <div className="text-center">
            <div className="mb-2">
                <p>You will be redirected in {count} seconds</p>
            </div>

            {/* <button onClick={() => router.push(url)} className="hover:text-primary-dark px-4 py-2 hover:underline">
                Click here if you are not redirected
            </button> */}
        </div>
    );
}
