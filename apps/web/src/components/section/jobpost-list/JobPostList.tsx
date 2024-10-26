"use client";

import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError, fetchReverseGeocode } from "@/features/locationSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { Job, Params } from "@/utils/interfaces";
import PaginationNumber from "@/components/PaginationNumber";
import { fetchProviceLocation } from "@/utils/fetch-province-location";
import Card from "@/components/Card";

export default function JobPostList() {
    const dispatch = useDispatch<ThunkDispatch<any, void, any>>();
    const { location, error, city } = useSelector((state: RootState) => state.location);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [titles, setTitles] = useState<string[]>([]);
    const [provinceLocation, setProvinceLocation] = useState<string[]>([]);

    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedTitle, setSelectedTitle] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<string>("");

    const [currPage, setCurrPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEntries, setTotalEntries] = useState(0);

    // Sort states for last month and post order (newest/oldest)
    const [isSortedByLastMonth, setIsSortedByLastMonth] = useState(false);
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); // Newest by default

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    dispatch(setLocation({ lat: latitude, lng: longitude }));
                    dispatch(fetchReverseGeocode({ lat: latitude, lng: longitude }));
                },
                (err) => {
                    dispatch(setError("Error retrieving location"));
                },
                { enableHighAccuracy: true },
            );
        } else {
            dispatch(setError("Geolocation is not supported by this browser."));
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const formattedLocations = await fetchProviceLocation();
            setProvinceLocation(formattedLocations);
        };
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            let params: Params = {
                page: currPage,
                limit: limit,
                cityLocation: city || "Ambatukam",
            };

            if (selectedCategory) params.category = selectedCategory;
            if (selectedTitle) params.title = selectedTitle;
            if (selectedLocation) params.provinceLocation = selectedLocation;

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, { params });
            let rawData: Job[] = res.data.data;

            // Apply sort by last month
            if (isSortedByLastMonth) {
                rawData = filterJobsByLastMonth(rawData);
            }

            // Apply sort order (newest or oldest)
            rawData = sortJobsByOrder(rawData, sortOrder);

            const categoriesData: string[] = Array.from(
                new Map(rawData.map((job) => [job.category, job.category])).values(),
            );
            const titlesData: string[] = Array.from(new Map(rawData.map((job) => [job.title, job.title])).values());

            setJobs(rawData);
            setCategories(categoriesData);
            setTitles(titlesData);
            setTotalPages(res.data.pagination.totalPages);
            setTotalEntries(res.data.pagination.totalItems);
        }
        fetchData();
    }, [currPage, limit, city, selectedCategory, selectedTitle, selectedLocation, isSortedByLastMonth, sortOrder]);

    // Filter jobs from the last 1 month
    function filterJobsByLastMonth(jobs: Job[]): Job[] {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        return jobs.filter((job) => new Date(job.createdAt) >= oneMonthAgo);
    }

    // Sort jobs by newest or oldest
    function sortJobsByOrder(jobs: Job[], order: "newest" | "oldest"): Job[] {
        return jobs.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return order === "newest" ? dateB - dateA : dateA - dateB;
        });
    }

    return (
        <div className="bg-white">
            <div className="lg:max-w-8xl mx-auto mt-10 flex max-w-2xl gap-x-4 px-4 sm:px-6 lg:px-8">
                <h2>WorkHive Jobs Search</h2>
            </div>

            <div className="lg:max-w-8xl mx-auto mt-10 flex max-w-2xl gap-x-4 px-4 sm:px-6 lg:px-8">
                {/* Category Select */}
                <select
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Kategori</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* Title Select */}
                <select
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    value={selectedTitle}
                    onChange={(e) => setSelectedTitle(e.target.value)}
                >
                    <option value="">Job Title</option>
                    {titles.map((title) => (
                        <option key={title} value={title}>
                            {title}
                        </option>
                    ))}
                </select>

                {/* Location Select */}
                <select
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                >
                    <option value="">Lokasi</option>
                    {provinceLocation.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>

                {/* Sort by Last Month */}
                <button
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    onClick={() => setIsSortedByLastMonth(!isSortedByLastMonth)}
                >
                    Sort by Last 1 Month
                </button>

                {/* Sort by Newest/Oldest */}
                <select
                    className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                >
                    <option value="newest">Sort by Newest</option>
                    <option value="oldest">Sort by Oldest</option>
                </select>
            </div>

            <div className="lg:max-w-8xl mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {jobs.length > 0 ? jobs.map((job) => <Card key={job.title} job={job} />) : "No Results Found"}
                </div>
                <div className="my-5 flex-row items-center justify-between space-x-2 space-y-2 text-center md:flex">
                    <div>
                        Showing {limit * (currPage - 1) + 1} - {limit * (currPage - 1) + jobs.length} of {totalEntries}
                    </div>
                    <PaginationNumber totalPages={totalPages} currPage={currPage} setCurrPage={setCurrPage} />
                </div>
            </div>
        </div>
    );
}
