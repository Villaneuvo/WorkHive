'use client';

import { Description, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Textarea } from '@/components/textarea';
import { Text } from '@/components/text';
import * as Headless from '@headlessui/react';
import { Button } from '@/components/Button';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateJobPost() {
    // TODO: Tampilan sudah OK atau belum?
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [banner, setBanner] = useState('');
    const [category, setCategory] = useState('Administrative');
    const [cityLocation, setCityLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [inputTags, setInputTags] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [deadline, setDeadline] = useState('');
    const [tagError, setTagError] = useState('');

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!inputTags) return;
            if (tags.includes(inputTags)) return;
            setTags([...tags, inputTags]);
            setInputTags('');
            setTagError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (tags.length === 0) {
            setTagError('At least one tag is required.');
            return;
        }
        const data = {
            title,
            description,
            category,
            cityLocation,
            tags,
            applicationDeadline: deadline,
            adminId: 1, // TODO: Change this to the actual admin ID
            ...(banner !== '' && { bannerUrl: banner }), // TODO: Change this to the actual banner URL using cloudinary or similar service
            ...(salary !== '' && salary !== '0' && { salary: +salary }),
        };
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, data);
            router.push(`/`); // TODO: Redirect to where?
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
                            <Headless.Field>
                                <Label>Banner</Label>
                                <Input name="banner" value={banner} onChange={(e) => setBanner(e.target.value)} />
                                <Description>
                                    If there is no banner, please leave this field empty. This field is optional.
                                </Description>
                            </Headless.Field>
                            <Headless.Field>
                                <Label>Category</Label>
                                <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="Technology">Technology</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Service">Service</option>
                                    <option value="Others">Others</option>
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
                                    invalid={tagError !== ''}
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
