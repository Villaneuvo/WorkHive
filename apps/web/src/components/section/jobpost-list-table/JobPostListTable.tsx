'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { Input, InputGroup } from '@/components/input';
import { Button } from '@/components/button';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import { Select } from '@/components/select';
import axios from 'axios';
import { formatCurrency, formatDate } from '@/utils/helpers';
import PaginationNumber from '@/components/PaginationNumber';
import { useRouter } from 'next/navigation';

export default function JobPostListTable({ adminId }: { adminId: string }) {
    // TODO: Tampilan sudah OK atau belum? pagination warna apa? (masih biru)
    // TODO: Tambahkan Authorization Admin
    const [jobPosts, setJobPosts] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('asc');
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const params: any = { page: currPage, limit };
            if (category !== 'All') params.category = category;
            if (search) params.search = search;
            if (sort) params.sort = sort;
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/adminId/${adminId}`,
                {
                    params,
                },
            );
            setJobPosts(response.data.data);
            setTotalPages(response.data.pagination.totalPages);
            setTotalEntries(response.data.pagination.totalItems);
        }
        fetchData();
    }, [currPage, limit, category, search, sort]);

    return (
        <div className="p-5">
            <div className="flex-row items-center justify-between space-x-2 space-y-2 md:flex">
                <InputGroup>
                    <MagnifyingGlassIcon />
                    <Input
                        name="search"
                        placeholder="Search&hellip;"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
                <div className="flex items-center justify-end space-x-4">
                    {/* TODO: Router push kemana? */}
                    <Button onClick={() => router.push(`/create-job-post`)}>Create Job Post</Button>
                    <Button onClick={() => (sort === 'asc' ? setSort('desc') : setSort('asc'))}>
                        Sort By Due Date
                    </Button>
                    <div className="flex items-center justify-center space-x-2">
                        <p>Category</p>
                        <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Technology">Technology</option>
                            <option value="Finance">Finance</option>
                            <option value="Construction">Construction</option>
                            <option value="Service">Service</option>
                            <option value="Others">Others</option>
                        </Select>
                    </div>
                </div>
            </div>
            <Table striped className="my-1 [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                    <TableRow>
                        <TableHeader>Job Title</TableHeader>
                        <TableHeader>Category</TableHeader>
                        <TableHeader>City Location</TableHeader>
                        <TableHeader>Salary</TableHeader>
                        <TableHeader>Due Date</TableHeader>
                        <TableHeader>Applicant</TableHeader>
                        <TableHeader>Publish Status</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobPosts.map((jobPost: JobPost) => (
                        <TableRow key={jobPost.title} href={`/${jobPost.id}`}>
                            <TableCell className="font-medium">{jobPost.title}</TableCell>
                            <TableCell>{jobPost.category}</TableCell>
                            <TableCell className="text-zinc-500">{jobPost.cityLocation}</TableCell>
                            <TableCell>{formatCurrency(jobPost.salary)}</TableCell>
                            <TableCell>{formatDate(jobPost.applicationDeadline)}</TableCell>
                            <TableCell>{jobPost.jobApplications.length}</TableCell>
                            <TableCell>
                                {jobPost.published ? (
                                    <p className="h-fit w-fit rounded bg-green-600 px-2 py-1 text-white">Published</p>
                                ) : (
                                    <p className="h-fit w-fit rounded bg-red-600 px-2 py-1 text-white">Not Published</p>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="my-5 flex-row items-center justify-between space-x-2 space-y-2 text-center md:flex">
                <div>
                    Showing {limit * (currPage - 1) + 1} - {limit * (currPage - 1) + jobPosts.length} of {totalEntries}
                </div>

                <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />

                <div className="flex items-center justify-center space-x-2">
                    <p>Entries</p>
                    <Select
                        name="entries"
                        value={limit}
                        onChange={(e) => setLimit(+e.target.value)}
                        className="max-w-20"
                    >
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </Select>
                </div>
            </div>
        </div>
    );
}
