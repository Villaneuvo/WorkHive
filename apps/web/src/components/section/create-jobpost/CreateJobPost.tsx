"use client";

import { Button } from "@/components/Button";
import { Description, FieldGroup, Fieldset, Label, Legend } from "@/components/Fieldset";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Text } from "@/components/Text";
import { Textarea } from "@/components/TextArea";
import { CloudinaryUrl } from "@/utils/interfaces";
import * as Headless from "@headlessui/react";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CreateJobPost({ adminId }: { adminId: string }) {
    // TODO: Tampilan sudah OK atau belum?
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [category, setCategory] = useState("Technology");
    const [cityLocation, setCityLocation] = useState("");
    const [provinceLocation, setProvinceLocation] = useState("");
    const [type, setType] = useState("Full-time");
    const [salary, setSalary] = useState("");
    const [inputTags, setInputTags] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [deadline, setDeadline] = useState("");
    const [tagError, setTagError] = useState("");

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!inputTags) return;
            if (tags.includes(inputTags)) return;
            setTags([...tags, inputTags]);
            setInputTags("");
            setTagError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (tags.length === 0) {
            setTagError("At least one tag is required.");
            return;
        }
        const data = {
            title,
            description,
            category,
            cityLocation,
            provinceLocation,
            type,
            tags,
            applicationDeadline: deadline,
            adminId: +adminId,
            ...(banner !== "" && { bannerUrl: banner }),
            ...(salary !== "" && salary !== "0" && { salary: +salary }),
        };
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, data);
            router.push(`/dashboard/manage-jobs`); // TODO: Redirect to where?
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="max-w-lg p-3">
                <form onSubmit={handleSubmit}>
                    <Fieldset>
                        <Legend>Submit Your Job Listing</Legend>
                        <Text>
                            Increase your chances of finding the perfect candidate by providing detailed information
                            about your job opening.
                        </Text>
                        <FieldGroup className="space-y-5">
                            <Headless.Field>
                                <Label>Job Title</Label>
                                <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                                <Description>
                                    If you have unique requirements or details, please share them here!
                                </Description>
                            </Headless.Field>
                            <Headless.Field className="flex flex-col">
                                <Label>Banner</Label>
                                <div>
                                    <CldUploadWidget
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                        onSuccess={(result, widget) => {
                                            if (result?.event === "success") {
                                                result?.info;
                                                const url = (result?.info as CloudinaryUrl)?.url;
                                                setBanner(url);
                                            }
                                        }}
                                    >
                                        {({ open }) => {
                                            return (
                                                <button
                                                    className="relative my-1 w-fit transform rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2 text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-offset-2 active:scale-95"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        open();
                                                    }}
                                                >
                                                    Upload Banner
                                                </button>
                                            );
                                        }}
                                    </CldUploadWidget>
                                    {banner && (
                                        <div className="relative my-1 h-32 w-32 overflow-hidden rounded-lg">
                                            <Image
                                                src={banner}
                                                fill={true}
                                                sizes="(max-width: 768px) 100vw, 128px"
                                                alt="Banner"
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>
                                <Description>This field is optional.</Description>
                            </Headless.Field>
                            <Headless.Field>
                                {/* TODO: Apakah dibuat enum seperti tidak masalah? */}
                                <Label>Category</Label>
                                <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Service">Service</option>
                                    <option value="Other">Other</option>
                                </Select>
                                <Description>
                                    Categories help candidates quickly understand the nature of the job.
                                </Description>
                            </Headless.Field>
                            <Headless.Field>
                                <Label>City</Label>
                                <Input
                                    name="city"
                                    value={cityLocation}
                                    onChange={(e) => setCityLocation(e.target.value)}
                                    required
                                />
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Province</Label>
                                <Input
                                    name="province"
                                    value={provinceLocation}
                                    onChange={(e) => setProvinceLocation(e.target.value)}
                                    required
                                />
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Type</Label>
                                <Select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Contract">Contract</option>
                                </Select>
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Salary</Label>
                                <Input
                                    type="number"
                                    name="salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <Description>
                                    If there is no salary, please leave this field empty or enter 0. This field is
                                    optional.
                                </Description>
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Tags</Label>
                                <Description>Press enter to add tags. Click on the tag to remove it.</Description>
                                <Input
                                    type="text"
                                    name="tags"
                                    value={inputTags}
                                    onChange={(e) => setInputTags(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                    placeholder="Press enter to add tags"
                                    invalid={tagError !== ""}
                                />
                                <div className="my-2 flex space-x-2">
                                    {tags.map((tag) => (
                                        <button
                                            key={tag}
                                            className="rounded-full bg-gray-200 px-2 py-1"
                                            onClick={() => setTags(tags.filter((item) => item !== tag))}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                                {tagError && <p className="text-red-500">{tagError}</p>}
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Deadline</Label>
                                <Input
                                    type="date"
                                    name="deadline"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                    required
                                />
                            </Headless.Field>
                            <Button type="submit">Post Job</Button>
                        </FieldGroup>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}
