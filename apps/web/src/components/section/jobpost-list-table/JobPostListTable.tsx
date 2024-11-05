"use client";

import { Button } from "@/components/Button";
import PaginationNumber from "@/components/PaginationNumber";
import SearchComponent from "@/components/SearchComponent";
import { Select } from "@/components/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Job } from "@/utils/interfaces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JobPostListTable({ adminId }: { adminId: string }) {
    // TODO: Tampilan sudah OK atau belum? pagination warna apa? (masih biru)
    // TODO: Tambahkan Authorization Admin
    const [jobPosts, setJobPosts] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("asc");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const params: any = { page: currPage, limit };
            if (category !== "All") params.category = category;
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
    }, [currPage, limit, category, search, sort, adminId]);

    return (
        <div className="p-5">
            <div className="flex-row items-center justify-between space-x-2 space-y-2 md:flex">
                <SearchComponent setCallback={setSearch} />
                <div className="flex items-center justify-end space-x-4">
                    <Button onClick={() => router.push(`/dashboard/manage-jobs/create`)}>Create Job Post</Button>
                    <Button onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}>
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
                    {jobPosts.length == 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-zinc-500">
                                No Job Post Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobPosts.map((jobPost: Job) => (
                            <TableRow key={jobPost.title} href={`/dashboard/manage-jobs/${jobPost.id}`}>
                                <TableCell className="font-medium">{jobPost.title}</TableCell>
                                <TableCell>{jobPost.category}</TableCell>
                                <TableCell>{jobPost.cityLocation}</TableCell>
                                <TableCell>{formatCurrency(jobPost.salary)}</TableCell>
                                <TableCell>{formatDate(jobPost.applicationDeadline)}</TableCell>
                                <TableCell>{jobPost.jobApplications.length}</TableCell>
                                <TableCell>
                                    {jobPost.published ? (
                                        <p className="h-fit w-fit rounded bg-green-600 px-2 py-1 text-white">
                                            Published
                                        </p>
                                    ) : (
                                        <p className="h-fit w-fit rounded bg-red-600 px-2 py-1 text-white">
                                            Not Published
                                        </p>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {jobPosts.length > 0 && (
                <div className="my-5 flex-row items-center justify-between space-x-2 space-y-2 text-center md:flex">
                    <div>
                        Showing {limit * (currPage - 1) + 1} - {limit * (currPage - 1) + jobPosts.length} of{" "}
                        {totalEntries}
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
            )}
        </div>
    );
}
