"use client";

import { Select } from "@/components/Select";
import { ExperienceCV } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import CVExperiencesSection from "./CVExperiencesSection";

export default function CVForm({ userId }: { userId: string }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [education, setEducation] = useState("SD");
    const [major, setMajor] = useState("");
    const [institution, setInstitution] = useState("");
    const [graduationDate, setGraduationDate] = useState("");
    const [finalGrade, setFinalGrade] = useState("");
    const [experiences, setExperiences] = useState<any[]>([]);
    const [skills, setSkills] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/userCVInfo/${userId}`,
            );
            setName(response.data.name);
            setEmail(response.data.email);
            setEducation(response.data.educationalBackground);
            setLoading(false);
        }
        fetchData();
    }, [userId]);
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = {
            name,
            email,
            phone,
            education,
            major,
            institution,
            graduationDate,
            finalGrade,
            experiences,
            skills,
        };
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/cv/${userId}`, data);
            window.open(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/cv`, "_blank");
        } catch (error) {
            console.error(error);
        }
    }
    if (loading) return <p>Loading...</p>;
    return (
        <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Isi Detail CV Anda</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* User Info */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                    <input
                        value={name}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        disabled
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        value={email}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        disabled
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="08123456789"
                        required
                    />
                </div>
                <hr className="border-t-2 border-black" />

                {/* Education */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pendidikan</label>
                    <Select name="education" value={education} onChange={(e) => setEducation(e.target.value)}>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </Select>
                </div>
                {(education === "S1" || education === "S2" || education === "S3") && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Program Studi</label>
                        <input
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            type="text"
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Program Studi"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Institusi</label>
                    <input
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={
                            education === "SD" || education === "SMP" || education === "SMA"
                                ? "SMAN 1 Contoh"
                                : "Universitas Contoh"
                        }
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tanggal Kelulusan</label>
                    <input
                        value={graduationDate}
                        onChange={(e) => setGraduationDate(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Mei 2022"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nilai Akhir</label>
                    <input
                        value={finalGrade}
                        onChange={(e) => setFinalGrade(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder={
                            education === "SD" || education === "SMP" || education === "SMA" ? "Nilai Akhir" : "IPK"
                        }
                        required
                    />
                </div>
                <hr className="border-t-2 border-black" />

                {/* Experience */}
                {experiences.length > 0 &&
                    experiences.map((exp: ExperienceCV, idx) => (
                        <div className="my-2" key={idx}>
                            <div className="flex items-center justify-between">
                                <p>
                                    {exp.position} | {exp.company}
                                </p>
                                <button
                                    className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-700"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const newExperiences = experiences.filter((_, index) => index !== idx);
                                        setExperiences(newExperiences);
                                    }}
                                >
                                    Hapus
                                </button>
                            </div>
                            <p>{exp.workingPeriod}</p>
                            <ul className="ml-4 list-inside list-disc">
                                {exp.description.map((desc, idx) => (
                                    <li key={idx}>{desc}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                <h2 className="block text-sm font-medium text-gray-700">Pengalaman</h2>
                <CVExperiencesSection setExperiences={setExperiences} experiences={experiences} />
                <hr className="border-t-2 border-black" />

                {/* Skills */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Skills</label>
                    <input
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        type="text"
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Skill 1, Skill 2, Skill 3"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-reseda-green hover:bg-reseda-green/75 focus:ring-reseda-green/20 w-full rounded-md py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50"
                >
                    Generate CV
                </button>
            </form>
        </div>
    );
}
