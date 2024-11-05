"use client";

import { Badge } from "@/components/Badge";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/Dropdown";
import { Subheading } from "@/components/Heading";
import PaginationNumber from "@/components/PaginationNumber";
import { Button } from "@/components/Button";
import SearchComponent from "@/components/SearchComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { formatDate } from "@/utils/helpers";
import { Certificate } from "@/utils/interfaces";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CertificatesUserMenu({ userId }: { userId: string }) {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [search, setSearch] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [sort, setSort] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;
    const [validate, setValidate] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                const params: any = { page: currPage, limit };
                if (searchTitle) params.searchTitle = searchTitle;
                if (sort) params.sort = sort;
                const resUser = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/userCertificateInfo/${userId}`,
                    { params },
                );
                setCertificates(resUser.data.data);
                setTotalPages(resUser.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching certificates", error);
            }
        }
        fetchData();
    }, [userId, searchTitle, sort, currPage]);
    function getBadgeStyle(status: string) {
        switch (status) {
            case "active":
                return "green";
            case "expired":
                return "red";
            default:
                return undefined;
        }
    }
    async function handleValidate() {
        try {
            setValidate("loading");
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/generator/verify/${search}`,
            );
            setValidate(response.data.message);
            setSearch("");
        } catch (error) {
            console.error(error);
        }
    }
    async function handleRenew(skillAssessmentId: string, userId: string) {
        try {
            const user = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/userId/${userId}`,
            );
            console.log(user.data.subscription);
            if (
                user.data.subscription.isActive &&
                (user.data.subscription.subscriptionType === "STANDARD"
                    ? user.data.subscription.quotaAssessment > 0
                    : true)
            ) {
                router.push(`skill-assessment/quiz/${skillAssessmentId}`);
            } else {
                alert("You need to subscribe to renew the certificate or your quota assessment has run out");
            }
        } catch (error) {
            console.error("Error fetching user subscription", error);
        }
    }
    return (
        <div className="mx-auto max-w-screen-xl px-8">
            <div className="my-5">
                <Subheading>Validate your certificate</Subheading>
                <div className="mt-3 flex max-w-sm gap-2">
                    <SearchComponent setCallback={setSearch} />
                    <Button onClick={handleValidate}>Validate</Button>
                </div>
                {validate && <p className="my-1">{validate}</p>}
            </div>
            <hr className="border-t-2 border-black" />

            <div className="mt-5">
                <Subheading className="my-3">Your Certificates List</Subheading>
                <div className="flex flex-col items-start space-y-2 md:flex-row md:items-center md:justify-between md:space-x-2">
                    <SearchComponent setCallback={setSearchTitle} />
                    <Button onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}>
                        Sort Expired Date
                    </Button>
                </div>
                <Table striped className="my-1 [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                        <TableRow>
                            <TableHeader>Skill Assessment</TableHeader>
                            <TableHeader>Status</TableHeader>
                            <TableHeader>Expired</TableHeader>
                            <TableHeader>Verification Code</TableHeader>
                            <TableHeader>Action</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {certificates.length == 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-zinc-500">
                                    No Certificate Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            certificates.map((certificate: Certificate) => (
                                <TableRow key={certificate.id}>
                                    <TableCell className="font-medium">{certificate.title}</TableCell>
                                    <TableCell>
                                        <Badge color={getBadgeStyle(certificate.status.toLowerCase())}>
                                            {certificate.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{formatDate(certificate.expiredDate)}</TableCell>
                                    <TableCell>{certificate.verificationCode}</TableCell>
                                    <TableCell>
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    {certificate.status === "EXPIRED" && (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleRenew(
                                                                    String(certificate.skillAssessmentId),
                                                                    String(certificate.userId),
                                                                )
                                                            }
                                                        >
                                                            Renew
                                                        </DropdownItem>
                                                    )}
                                                    <DropdownItem
                                                        onClick={() => window.open(certificate.pdfUrl, "_blank")}
                                                    >
                                                        View
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            window.open(
                                                                `https://www.linkedin.com/shareArticle?url=${certificate.pdfUrl}&title=Saya%20Telah%20Mencapai%20Sertifikasi%20Baru!`,
                                                                "_blank",
                                                            )
                                                        }
                                                    >
                                                        Share LinkedIn
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
                {certificates.length > 0 && (
                    <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
                )}
            </div>
        </div>
    );
}
