"use client";

import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const EndorsementForm = () => {
    const [userId, setUserId] = useState("");
    const [text, setText] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!text.trim() || !expiresAt) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const data: any = {
                userId: Number(userId),
                text,
                expiresAt,
            };

            if (!isAnonymous) {
                data.endorserId = session?.user.id;
            }

            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/endorsement`, data);
            setSuccess("Endorsement submitted successfully!");
            setText("");
            setExpiresAt("");
            setIsAnonymous(false); // Reset anonymity checkbox
        } catch (error) {
            console.error("Error submitting endorsement:", error);
            setError("Failed to submit endorsement.");
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-lg rounded-lg bg-white p-4 shadow-md">
            <h2 className="text-center text-2xl font-semibold">Endorse User</h2>
            {error && <p className="text-center text-red-500">{error}</p>}
            {success && <p className="text-center text-green-500">{success}</p>}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <label htmlFor="userId" className="block">
                    Input User ID to endorse
                </label>
                <input
                    type="number"
                    value={userId}
                    onChange={(e) => {
                        const value = e.target.value;
                        setUserId(value === "" ? "" : value); // Keep as an empty string if cleared
                    }}
                    required
                    className="focus:ring-reseda-green no-arrows w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
                />
                <label htmlFor="text" className="block">
                    Endorsement Text
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write your endorsement..."
                    rows={4}
                    required
                    className="focus:ring-reseda-green w-full resize-none rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
                />
                <label htmlFor="expiresAt" className="block">
                    Endorsement Expiry Date
                </label>
                <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    required
                    className="focus:ring-reseda-green w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2"
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={() => setIsAnonymous(!isAnonymous)}
                        className="text-reseda-green focus:ring-reseda-green mr-2 h-4 w-4 rounded border-gray-300"
                    />
                    <label htmlFor="anonymous" className="text-sm">
                        Submit anonymously
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-reseda-green hover:bg-reseda-green/75 w-full rounded-md p-2 text-white transition duration-200"
                >
                    Submit Endorsement
                </button>
            </form>
        </div>
    );
};

export default EndorsementForm;
