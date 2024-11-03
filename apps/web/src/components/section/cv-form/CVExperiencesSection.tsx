"use client";

import { useState } from "react";

export default function CVExperiencesSection({
    setExperiences,
    experiences,
}: {
    setExperiences: React.Dispatch<
        React.SetStateAction<{ company: string; position: string; workingPeriod: string; description: string[] }[]>
    >;
    experiences: { company: string; position: string; workingPeriod: string; description: string[] }[];
}) {
    const [inputDesc, setInputDesc] = useState("");
    const [description, setDescription] = useState<string[]>([]);
    const [experience, setExperience] = useState({
        company: "",
        position: "",
        workingPeriod: "",
    });
    function handleTagKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!inputDesc) return;
            if (description.includes(inputDesc)) return;
            setDescription([...description, inputDesc]);
            setInputDesc("");
        }
    }
    function handleAddExperience(e: React.MouseEvent) {
        e.preventDefault();
        if (!experience.company || !experience.position || !experience.workingPeriod || description.length === 0)
            return;
        setExperiences([
            ...experiences,
            {
                company: experience.company,
                position: experience.position,
                workingPeriod: experience.workingPeriod,
                description: description,
            },
        ]);
        setExperience({
            company: "",
            position: "",
            workingPeriod: "",
        });
        setDescription([]);
    }
    return (
        <>
            <div>
                <label className="block text-sm font-medium text-gray-700">Perusahaan</label>
                <input
                    value={experience.company}
                    onChange={(e) => setExperience({ ...experience, company: e.target.value })}
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Perusahaan"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Posisi</label>
                <input
                    value={experience.position}
                    onChange={(e) => setExperience({ ...experience, position: e.target.value })}
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Posisi"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Periode Kerja</label>
                <input
                    value={experience.workingPeriod}
                    onChange={(e) => setExperience({ ...experience, workingPeriod: e.target.value })}
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Januari 2021 - Sekarang"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <p className="text-sm font-normal text-gray-400">
                    Tekan enter untuk menambahkan deskripsi. Klik pada list deskripsi untuk menghapus.
                </p>
                <input
                    value={inputDesc}
                    onChange={(e) => setInputDesc(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tekan enter untuk menambahkan deskripsi"
                />
                {description.map((desc) => (
                    <button
                        key={desc}
                        className="my-1 block text-balance rounded bg-gray-200 px-2 py-1 text-left"
                        onClick={() => setDescription(description.filter((item) => item !== desc))}
                    >
                        {`- ${desc}`}
                    </button>
                ))}
            </div>
            <button
                onClick={handleAddExperience}
                className="bg-reseda-green hover:bg-reseda-green/75 focus:ring-reseda-green/20 w-full rounded-md py-2 font-medium text-white focus:outline-none focus:ring-2 focus:ring-opacity-50"
            >
                Tambahkan Pengalaman
            </button>
        </>
    );
}
