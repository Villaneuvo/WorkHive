"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const EndorsmentPage: React.FC<{ userId: number }> = ({ userId }) => {
    const [endorsements, setEndorsements] = useState<any[]>([]);

    useEffect(() => {
        const fetchEndorsements = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/endorsement/${userId}`,
                );
                setEndorsements(response.data);
            } catch (error) {
                console.error("Error fetching endorsements:", error);
            }
        };
        fetchEndorsements();
    }, [userId]);

    const handleShare = (text: string, type: string) => {
        const endorsementText = encodeURIComponent(
            `Halo, Saya baru saja mendapatkan endorsement dari rekan saya di WorkHive.com. Dengan ini saya sangat senang dan berterima kasih atas dukungan yang diberikan. Yuk, berikan dukungan juga kepada rekan kerja Anda di WorkHive.com! \n\n My Endorsment Message: ${text} \n\n #WorkHive #Endorsement #KerjaNyaman #KerjaBahagia\n\n`,
        );

        if (type === "linkedin") {
            const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                window.location.href,
            )}&title=Endorsement&summary=${endorsementText}`;
            window.open(linkedinUrl, "_blank");
            return;
        }

        if (type === "twitter") {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${endorsementText}&url=${encodeURIComponent(window.location.href)}`;

            window.open(twitterUrl, "_blank");
            return;
        }
    };

    return (
        <div className="mx-auto mt-6 max-w-3xl rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-center text-3xl font-semibold">Endorsements</h3>
            <ul className="space-y-4">
                {endorsements.length > 0 ? (
                    endorsements.map((endorsement) => (
                        <li
                            key={endorsement?.id}
                            className="rounded-lg border border-gray-300 p-4 shadow-sm transition duration-200 hover:shadow-md"
                        >
                            <p className="text-gray-800">{endorsement?.text}</p>
                            <p className="text-sm text-gray-500">
                                Expires: {new Date(endorsement?.expiresAt).toLocaleDateString()}
                            </p>
                            <span>{`Share's On`}</span>
                            <div className="mt-2 flex">
                                <button
                                    onClick={() => handleShare(endorsement?.text, "linkedin")}
                                    className="bg-reseda-green hover:bg-reseda-green/75 mr-2 flex items-center gap-x-2 rounded px-4 py-2 text-white transition duration-200"
                                >
                                    <FaLinkedin /> LinkedIn
                                </button>
                                <button
                                    onClick={() => handleShare(endorsement?.text, "twitter")}
                                    className="bg-reseda-green hover:bg-reseda-green/75 flex items-center gap-x-2 rounded px-4 py-2 text-white transition duration-200"
                                >
                                    <FaSquareXTwitter /> Twitter
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">No endorsements available.</li>
                )}
            </ul>
        </div>
    );
};

export default EndorsmentPage;
