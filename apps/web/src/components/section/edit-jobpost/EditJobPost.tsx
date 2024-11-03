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
import React, { useEffect, useState } from "react";

export default function EditJobPost({ id, adminId }: { id: string; adminId: string }) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [category, setCategory] = useState("Technology");
    const [cityLocation, setCityLocation] = useState("");
    const [provinceLocation, setProvinceLocation] = useState("");
    const [type, setType] = useState("Full-time");
    const [salary, setSalary] = useState("");
    const [deadline, setDeadline] = useState("");

    useEffect(() => {
        async function fetchJobPost() {
            try {
                const params = {
                    adminId: +adminId,
                };
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/admin/${id}`,
                    {
                        params,
                    },
                );
                const jobData = response.data;
                setTitle(jobData.title);
                setDescription(jobData.description);
                setCategory(jobData.category);
                setCityLocation(jobData.cityLocation);
                setProvinceLocation(jobData.provinceLocation);
                setType(jobData.type);
                setSalary(jobData.salary || "");
                setDeadline(new Date(jobData.applicationDeadline).toISOString().split("T")[0]);
                setBanner(jobData.bannerUrl || "");
            } catch (error) {
                console.error("Error fetching job post:", error);
            }
        }
        fetchJobPost();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            title,
            description,
            category,
            cityLocation,
            provinceLocation,
            type,
            applicationDeadline: deadline,
            adminId: +adminId,
            ...(banner !== "" && { bannerUrl: banner }),
            ...(salary !== "" && { salary: +salary }),
        };
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/admin/${id}`, data);
            router.push(`/jobposts/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <div className="max-w-lg p-3">
                <form onSubmit={handleSubmit}>
                    <Fieldset>
                        <Legend>Edit Job Posting</Legend>
                        <Text>Update the details of your job posting to make it more accurate and appealing.</Text>
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
                                <Description>Add any special details or requirements for the job here.</Description>
                            </Headless.Field>
                            <Headless.Field className="flex flex-col">
                                <Label>Banner</Label>
                                <div>
                                    <CldUploadWidget
                                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                                        onSuccess={(result, widget) => {
                                            if (result?.event === "success") {
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
                                                    Upload New Banner
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
                                <Label>Category</Label>
                                <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Service">Service</option>
                                    <option value="Other">Other</option>
                                </Select>
                                <Description>Choose the category that best fits your job.</Description>
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
                                <Description>Enter 0 if there is no salary offered.</Description>
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
                            <div className="flex flex-col space-y-2">
                                <Button type="submit">Save Changes</Button>
                                <Button onClick={() => window.history.back()} color="red">
                                    Cancel
                                </Button>
                            </div>
                        </FieldGroup>
                    </Fieldset>
                </form>
            </div>
        </div>
    );
}
