"use client";

import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/Dropdown";
import PaginationNumber from "@/components/PaginationNumber";
import SearchComponent from "@/components/SearchComponent";
import { Select } from "@/components/Select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { formatCurrency } from "@/utils/helpers";
import { JobApplication } from "@/utils/interfaces";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ApplicantListTable({ jobId }: { jobId: string }) {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const [searchName, setSearchName] = useState("");
    const [filterAge, setFilterAge] = useState("all");
    const [filterSalary, setFilterSalary] = useState("all");
    const [filterEducation, setFilterEducation] = useState("all");
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    useEffect(() => {
        async function fetchJobApplications() {
            try {
                const params: any = { page: currPage, limit };
                if (searchName) params.searchName = searchName;
                if (filterAge !== "all") params.filterAge = filterAge;
                if (filterSalary !== "all") params.filterSalary = filterSalary;
                if (filterEducation !== "all") params.filterEducation = filterEducation;
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobapplications/jobPostId/${jobId}`,
                    { params },
                );
                setJobApplications(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching job applications:", error);
            }
        }
        fetchJobApplications();
    }, [searchName, filterAge, filterSalary, filterEducation, currPage]);

    function getBadgeStyle(status: string) {
        switch (status) {
            case "pending":
                return "yellow";
            case "interview":
                return "blue";
            case "accepted":
                return "green";
            case "rejected":
                return "red";
            default:
                return undefined;
        }
    }
    async function handleChangeStatus(id: number, status: string) {
        try {
            const bodyRequest = {
                status,
            };
            await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobapplications/changeStatus/${id}`,
                bodyRequest,
            );
            window.location.reload();
        } catch (error) {
            console.error("Error change status", error);
        }
    }

    return (
        <div>
            <div className="flex-row items-center justify-between space-x-2 space-y-2 md:flex">
                <SearchComponent setCallback={setSearchName} />
                <div className="flex items-center justify-center space-x-2">
                    <p>Age</p>
                    <Select
                        name="age"
                        value={filterAge}
                        onChange={(e) => {
                            setFilterAge(e.target.value);
                            setCurrPage(1);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="below_20">{"<"} 20 years old</option>
                        <option value="20_25">20-25 years old</option>
                        <option value="25_30">25-30 years old</option>
                        <option value="above_30">{">"} 30 years old</option>
                    </Select>
                </div>
                <div className="flex items-center justify-center space-x-2">
                    <p>Salary</p>
                    <Select
                        name="salary"
                        value={filterSalary}
                        onChange={(e) => {
                            setFilterSalary(e.target.value);
                            setCurrPage(1);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="below_3m">{"<"} Rp3.000.000</option>
                        <option value="3m_5m">Rp3.000.000 - Rp5.000.000</option>
                        <option value="5m_10m">Rp5.000.000 - Rp10.000.000</option>
                        <option value="above_10m">{">"} Rp10.000.000</option>
                    </Select>
                </div>
                <div className="flex items-center justify-center space-x-2">
                    <p>Education</p>
                    <Select
                        name="category"
                        value={filterEducation}
                        onChange={(e) => {
                            setFilterEducation(e.target.value);
                            setCurrPage(1);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="SD">SD</option>
                        <option value="SMP">SMP</option>
                        <option value="SMA">SMA</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </Select>
                </div>
            </div>

            <Table striped className="my-1 [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                    <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Age</TableHeader>
                        <TableHeader>Expected Salary</TableHeader>
                        <TableHeader>Educational Background</TableHeader>
                        <TableHeader>CV</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Action</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobApplications.length == 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-zinc-500">
                                No Applicant Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobApplications.map((jobApplication: JobApplication) => (
                            <TableRow key={jobApplication.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-4">
                                        <Avatar src={jobApplication.user.photoUrl} className="size-12" />
                                        <div className="font-medium">{jobApplication.user.name}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{jobApplication.user.age}</TableCell>
                                <TableCell>{formatCurrency(jobApplication.expectedSalary)}</TableCell>
                                <TableCell>{jobApplication.user.educationalBackground}</TableCell>
                                <TableCell>
                                    <Button onClick={() => window.open(jobApplication.cvUrl, "_blank")}>View</Button>
                                </TableCell>
                                <TableCell>
                                    <Badge color={getBadgeStyle(jobApplication.status.toLowerCase())}>
                                        {jobApplication.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                        <Dropdown>
                                            <DropdownButton plain aria-label="More options">
                                                <EllipsisHorizontalIcon />
                                            </DropdownButton>
                                            <DropdownMenu anchor="bottom end">
                                                <DropdownItem
                                                    onClick={() => handleChangeStatus(jobApplication.id, "PENDING")}
                                                >
                                                    Pending
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => handleChangeStatus(jobApplication.id, "INTERVIEW")}
                                                >
                                                    Interview
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => handleChangeStatus(jobApplication.id, "ACCEPTED")}
                                                >
                                                    Accept
                                                </DropdownItem>
                                                <DropdownItem
                                                    onClick={() => handleChangeStatus(jobApplication.id, "REJECTED")}
                                                >
                                                    Reject
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {jobApplications.length > 0 && (
                <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
            )}
        </div>
    );
}
