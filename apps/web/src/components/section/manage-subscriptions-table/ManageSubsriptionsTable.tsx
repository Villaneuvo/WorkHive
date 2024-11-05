"use client";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/Dropdown";
import PaginationNumber from "@/components/PaginationNumber";
import SearchComponent from "@/components/SearchComponent";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Table";
import { formatDate } from "@/utils/helpers";
import { User } from "@/utils/interfaces";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ManageSubsriptionsTable() {
    const [userSubscriptions, setUserSubscriptions] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("desc");
    const limit = 10;

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const params: any = { page: currPage, limit };
                params.sort = sort;
                if (search) params.search = search;
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/admin`, {
                    params,
                });
                setUserSubscriptions(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching subscriptions:", error);
            }
        };
        fetchSubscriptions();
    }, [search, currPage, sort]);

    function getBadgeStyle(status: string) {
        switch (status) {
            case "APPROVED":
                return "green";
            case "REJECTED":
                return "red";
            case "PENDING":
                return "yellow";
            default:
                return "zinc";
        }
    }
    async function handleChangeStatus(userId: string, status: string) {
        try {
            const bodyRequest = {
                isApproved: status,
            };
            await axios.put(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/approve/${userId}`,
                bodyRequest,
            );
            setUserSubscriptions((prevUserSubscription) =>
                prevUserSubscription.map((user) =>
                    user.id == userId
                        ? {
                              ...user,
                              subscription: {
                                  ...user.subscription,
                                  isApproved: status,
                                  ...(status === "APPROVED" && { isActive: status === "APPROVED" }),
                                  ...(!(status === "APPROVED") && { transferProof: "" }),
                                  ...(status === "APPROVED" && {
                                      endDate: new Date(
                                          new Date(user.subscription.endDate).setMonth(
                                              new Date(user.subscription.endDate).getMonth() + 1,
                                          ),
                                      ).toISOString(),
                                  }),
                              },
                          }
                        : user,
                ),
            );
        } catch (error) {
            console.error("Error changing status:", error);
        }
    }
    return (
        <div className="mt-8 px-8">
            <div className="flex-row items-center justify-between space-x-2 space-y-2 md:flex">
                <SearchComponent setCallback={setSearch} />
                <Button onClick={() => (sort === "asc" ? setSort("desc") : setSort("asc"))}>Sort Approve Status</Button>
            </div>
            <Table striped className="my-1 [--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                <TableHead>
                    <TableRow>
                        <TableHeader>Name</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Tipe Subscription</TableHeader>
                        <TableHeader>Status Subscription</TableHeader>
                        <TableHeader>Tanggal Berakhir</TableHeader>
                        <TableHeader>Status Approve</TableHeader>
                        <TableHeader>Bukti Transfer</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userSubscriptions.length == 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-zinc-500">
                                No Applicant Found
                            </TableCell>
                        </TableRow>
                    ) : (
                        userSubscriptions.map((userSubscription: User) => (
                            <TableRow key={userSubscription.id}>
                                <TableCell className="font-medium">{userSubscription.name}</TableCell>
                                <TableCell>{userSubscription.email}</TableCell>
                                <TableCell>
                                    {userSubscription.subscription
                                        ? userSubscription.subscription.subscriptionType
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        color={getBadgeStyle(
                                            userSubscription.subscription?.isActive ? "APPROVED" : "REJECTED",
                                        )}
                                    >
                                        {userSubscription.subscription?.isActive ? "Aktif" : "Tidak Aktif"}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {userSubscription.subscription?.endDate
                                        ? formatDate(new Date(userSubscription.subscription?.endDate))
                                        : "-"}
                                </TableCell>
                                <TableCell>
                                    <Badge color={getBadgeStyle(userSubscription.subscription?.isApproved)}>
                                        {userSubscription.subscription?.isApproved}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {userSubscription.subscription?.transferProof ? (
                                        <Button
                                            onClick={() =>
                                                // TODO: ganti jadi view nya lewat modal
                                                window.open(userSubscription.subscription?.transferProof, "_blank")
                                            }
                                        >
                                            View
                                        </Button>
                                    ) : (
                                        "-"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {userSubscription.subscription?.isApproved === "PENDING" ? (
                                        <div className="-mx-3 -my-1.5 sm:-mx-2.5">
                                            <Dropdown>
                                                <DropdownButton plain aria-label="More options">
                                                    <EllipsisHorizontalIcon />
                                                </DropdownButton>
                                                <DropdownMenu anchor="bottom end">
                                                    <DropdownItem
                                                        onClick={() =>
                                                            handleChangeStatus(userSubscription.id, "APPROVED")
                                                        }
                                                    >
                                                        APPROVE
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() =>
                                                            handleChangeStatus(userSubscription.id, "REJECTED")
                                                        }
                                                    >
                                                        REJECT
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            {userSubscriptions.length > 0 && (
                <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
            )}
        </div>
    );
}
