"use client";

import { useDispatch, useSelector } from "react-redux";
import { setLocation, setError, fetchReverseGeocode } from "@/features/locationSlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Job } from "@/utils/interfaces";
import axios from "axios";
import Card from "@/components/Card";

export default function JobDiscovery() {
    const dispatch = useDispatch<ThunkDispatch<any, void, any>>();
    const { location, error, city } = useSelector((state: RootState) => state.location);
    const [jobs, setJobs] = useState<Job[]>([]);

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
        async function fetchData() {
            let params: { page: number; limit: number; cityLocation?: string } = {
                page: 1,
                limit: 6,
                cityLocation: city || "Ambatukam",
            };

            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, { params });
            const rawData = res.data.data;

            setJobs(rawData);
        }
        fetchData();
    }, [city]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="mx-auto mb-10 max-w-3xl sm:flex sm:flex-col sm:items-center sm:text-center">
                    {error ? (
                        <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                            Intip lowongan pekerjaan terbaru di WokrHive.com
                        </h2>
                    ) : (
                        <h2 className="text-3xl font-medium tracking-tight text-gray-900">
                            Intip lowongan pekerjaan terbaru di {city}
                        </h2>
                    )}
                    <p className="mt-2 text-lg text-gray-600 sm:max-w-2xl">
                        Dapatkan lowongan pekerjaan yang sesuai dengan keahlian dan minatmu di WorkHive.com
                    </p>
                    <div></div>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {jobs.map((job) => (
                        <Card key={job.title} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
}
