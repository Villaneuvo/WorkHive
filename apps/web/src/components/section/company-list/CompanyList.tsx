"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Company, Params } from "@/utils/interfaces";
import PaginationNumber from "@/components/PaginationNumber";
import CardCompanies from "@/components/CardCompanies";

export default function CompanyList() {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [currPage, setCurrPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    // New search and sorting states
    const [searchName, setSearchName] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [sortOrder, setSortOrder] = useState("asc"); // Sorting by name (ascending or descending)

    useEffect(() => {
        async function fetchData() {
            let params: Params = {
                page: currPage,
                limit: limit,
                companyName: searchName,
                companyLocation: searchLocation,
                sort: sortOrder, // Added sorting parameter
            };

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/company`, {
                    params,
                });
                let rawData = res.data.data;
                setCompanies(rawData);
                setTotalPages(res.data.pagination.totalPages);
                setTotalEntries(res.data.pagination.totalItems);
            } catch (error) {
                console.error("Failed to fetch companies", error);
            }
        }
        fetchData();
    }, [currPage, limit, searchName, searchLocation, sortOrder]);

    const handleSortChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    };

    return (
        <div className="bg-white">
            <div className="lg:max-w-8xl mx-auto mt-10 flex max-w-2xl flex-col gap-x-4 px-4 sm:px-6 lg:px-8">
                <h2>WorkHive Companies Search</h2>
                <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Search by company"
                        className="focus:ring-reseda-green rounded-md bg-gray-100 bg-[url('/building-office.svg')] bg-[length:20px_20px] bg-[24px_50%] bg-no-repeat p-6 pl-12 text-sm text-gray-700 focus:outline-none focus:ring-2 sm:w-60 lg:w-72"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Search by city location"
                        className="focus:ring-reseda-green rounded-md bg-gray-100 bg-[url('/location.svg')] bg-[length:20px_20px] bg-[24px_50%] bg-no-repeat p-6 pl-12 text-sm text-gray-700 focus:outline-none focus:ring-2 sm:w-60 lg:w-72"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                    <button onClick={handleSortChange} className="bg-reseda-green rounded p-2 text-white">
                        Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
                    </button>
                </div>
            </div>

            <div className="lg:max-w-8xl mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-x-6 gap-y-10">
                    {companies.length > 0
                        ? companies.map((company) => <CardCompanies company={company} key={company.companyName} />)
                        : "No Results Found"}
                </div>

                <div className="my-5 flex-row items-center justify-between space-x-2 space-y-2 text-center md:flex">
                    <div>
                        Showing {limit * (currPage - 1) + 1} - {limit * (currPage - 1) + companies.length} of{" "}
                        {totalEntries}
                    </div>
                    <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
                </div>
            </div>
        </div>
    );
}
