"use client";

import { User } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CVTemplateATS({ userId }: { userId: string }) {
    const [user, setUser] = useState<Partial<User>>({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/userCVInfo/${userId}`,
            );
            setUser(response.data);
            if (user.cv === undefined) return;
            setUser((prev) => {
                const updatedCv = {
                    ...prev.cv,
                    experiences: response.data.cv.experiences.map((exp: any) => ({
                        ...exp,
                        description: exp.description.split(","),
                    })),
                };

                return {
                    ...prev,
                    cv: updatedCv,
                } as Partial<User>;
            });
            setLoading(false);
        }
        fetchData();
    }, [userId]);
    if (loading || user.cv == undefined || !userId) return <p>Loading...</p>;
    return (
        <div className="mx-auto max-w-2xl bg-white p-4 text-gray-900" style={{ fontFamily: "Arial, sans-serif" }}>
            {/* Personal Information */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p>
                    Email: {user.email} | Telepon: {user.cv?.phoneNumber}
                </p>
            </div>

            {/* Education Section */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Pendidikan</h2>
                <hr className="border-t-2 border-black" />
                {user.cv?.education.education === "SD" ||
                user.cv?.education.education === "SMP" ||
                user.cv?.education.education === "SMA" ? (
                    <>
                        <p>{user.cv?.education.institution}</p>
                        <p>
                            Lulus: {user.cv?.education.graduationDate}, Nilai Akhir: {user.cv.education.finalGrade}
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            {user.cv?.education.major}, {user.cv?.education.institution}
                        </p>
                        <p>
                            Lulus: {user.cv?.education.graduationDate}, IPK: {user.cv?.education.finalGrade}
                        </p>
                    </>
                )}
            </div>

            {/* Experience Section */}
            {(user.cv?.experiences || []).length > 0 && (
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Pengalaman Profesional</h2>
                    <hr className="border-t-2 border-black" />
                    {user.cv?.experiences.map((exp) => (
                        <div className="my-2" key={exp.id}>
                            <p>
                                {exp.position} | {exp.company}
                            </p>
                            <p>{exp.workingPeriod}</p>
                            <ul className="ml-4 list-inside list-disc">
                                {exp.description.map((desc, index) => (
                                    <li key={index}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills Section */}
            <div className="mb-4">
                <h2 className="text-lg font-semibold">Skills</h2>
                <hr className="border-t-2 border-black" />
                <p>{user.cv?.skills}</p>
            </div>
        </div>
    );
}
