"use client";

import { useEffect, useReducer, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import axios from "axios";
import { ACTIONS } from "../utils/action-search";
import { reducer, initialState } from "../utils/reducer-search";
import { fetchProviceLocation } from "../utils/fetch-province-location";

export default function SearchBar() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { locationInput, debounceInput, positionInput, locationList, positionList, allLocations, showSuggestions } =
        state;
    const suggestionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const formattedLocations = await fetchProviceLocation(debounceInput);
            dispatch({ type: ACTIONS.SET_ALL_LOCATIONS, payload: formattedLocations });
            dispatch({ type: ACTIONS.SET_LOCATION_LIST, payload: formattedLocations });
        };
        fetchData();
    }, [debounceInput]);

    useEffect(() => {
        async function fetchData() {
            if (!positionInput) {
                dispatch({ type: ACTIONS.SET_POSITION_LIST, payload: [] });
                return;
            }

            let params: { page: number; limit: number; title?: string } = {
                page: 1,
                limit: 100,
                title: positionInput,
            };

            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts`, { params });
                const rawData = res.data.data;

                console.log("Fetched Data: ", rawData);
                dispatch({ type: ACTIONS.SET_POSITION_LIST, payload: rawData });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [positionInput]);

    // Debounce for PostionInput Handling
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: ACTIONS.SET_DEBOUNCE_INPUT, payload: positionInput });
        }, 500);
        return () => clearTimeout(timer);
    }, [positionInput]);

    useEffect(() => {
        if (debounceInput === "") {
            dispatch({ type: ACTIONS.SET_POSITION_LIST, payload: [] });
        } else {
            dispatch({ type: ACTIONS.SET_POSITION_LIST, payload: positionList });
        }
    }, [debounceInput, positionList]);

    // Debounce for location input
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: ACTIONS.SET_DEBOUNCE_INPUT, payload: locationInput });
        }, 500);
        return () => clearTimeout(timer);
    }, [locationInput]);

    useEffect(() => {
        if (debounceInput === "") {
            dispatch({ type: ACTIONS.SET_LOCATION_LIST, payload: allLocations });
        } else {
            const filteredLocations = allLocations.filter((location: string) =>
                location.toLowerCase().includes(debounceInput.toLowerCase()),
            );
            dispatch({ type: ACTIONS.SET_LOCATION_LIST, payload: filteredLocations });
        }
    }, [debounceInput, allLocations]);

    const handleChangeLocationInput = (val: string) => {
        dispatch({ type: ACTIONS.SET_LOCATION_INPUT, payload: val });
        dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: true });
    };

    const handleChangePositionInput = (val: string) => {
        dispatch({ type: ACTIONS.SET_POSITION_INPUT, payload: val });
        dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: true });
    };

    const handleSelectPosition = (position: string) => {
        dispatch({ type: ACTIONS.SET_POSITION_INPUT, payload: position });
        dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: false });
    };

    const handleSelectLocation = (location: string) => {
        dispatch({ type: ACTIONS.SET_LOCATION_INPUT, payload: location });
        dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: false });
    };

    const handleBlurSuggestions = () => {
        setTimeout(() => {
            dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: false });
        }, 150);
    };

    const handleFocusSuggestions = () => {
        dispatch({ type: ACTIONS.SET_SHOW_SUGGESTIONS, payload: true });
    };

    return (
        <>
            <div className="mt-6 flex flex-col gap-y-5 sm:flex-row">
                <div className="flex flex-col gap-x-0.5 gap-y-5 sm:flex-row sm:rounded-l-md sm:border sm:border-black/25 sm:bg-gray-100">
                    <input
                        type="text"
                        value={positionInput}
                        placeholder="Posisi atau Perusahaan"
                        onChange={(e) => handleChangePositionInput(e.target.value)}
                        className="focus:ring-reseda-green rounded-md bg-gray-100 bg-[url('/building-office.svg')] bg-[length:20px_20px] bg-[24px_50%] bg-no-repeat p-6 pl-12 text-sm text-gray-700 focus:outline-none focus:ring-2 sm:w-60 sm:rounded-none sm:rounded-l-md lg:w-72"
                        onBlur={handleBlurSuggestions}
                        onFocus={handleFocusSuggestions}
                    />

                    <input
                        type="text"
                        value={locationInput}
                        onChange={(e) => handleChangeLocationInput(e.target.value)}
                        placeholder="Lokasi"
                        className="focus:ring-reseda-green rounded-md bg-gray-100 bg-[url('/location.svg')] bg-[length:20px_20px] bg-[24px_50%] bg-no-repeat p-6 pl-12 text-sm text-gray-700 focus:outline-none focus:ring-2 sm:w-32 sm:rounded-none sm:border-l sm:border-black/25 lg:w-48"
                        onBlur={handleBlurSuggestions}
                        onFocus={handleFocusSuggestions}
                    />
                </div>
                <button className="bg-reseda-green hover:bg-reseda-green/75 hidden gap-x-2 rounded-md p-6 sm:flex sm:rounded-none sm:rounded-r-md">
                    <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                    <span className="font-medium text-white">Cari</span>
                </button>
            </div>

            {/* Based on Location Input Result */}
            {showSuggestions && locationInput !== "" && (
                <div
                    ref={suggestionRef}
                    className="border-text-main/25 mt-2 max-h-48 overflow-x-hidden overflow-y-scroll rounded-md border bg-white shadow-2xl"
                    onMouseDown={() => handleFocusSuggestions()}
                    onMouseLeave={() => handleBlurSuggestions()}
                >
                    <ul className="py-1">
                        {locationList.length === 0 ? (
                            <li className="text-text-main px-4 py-2 text-sm leading-5">Tidak ada hasil</li>
                        ) : (
                            locationList.map((location: string) => (
                                <li
                                    key={location}
                                    className="text-text-main cursor-pointer px-4 py-2 text-sm leading-5 hover:bg-gray-50"
                                    onClick={() => handleSelectLocation(location)}
                                >
                                    <div className="ml-3 text-base">
                                        <span>{location}</span>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

            {/* Based on Position Input Result */}
            {showSuggestions && positionInput !== "" && (
                <div
                    ref={suggestionRef}
                    className="border-text-main/25 mt-2 max-h-48 overflow-x-hidden overflow-y-scroll rounded-md border bg-white shadow-2xl"
                    onMouseDown={() => handleFocusSuggestions()}
                    onMouseLeave={() => handleBlurSuggestions()}
                >
                    <ul className="py-1">
                        {positionList.length === 0 ? (
                            <li className="text-text-main px-4 py-2 text-sm leading-5">Tidak ada hasil</li>
                        ) : (
                            positionList.map((position: SearchJobPosition) => (
                                <li
                                    key={position.id}
                                    className="text-text-main cursor-pointer px-4 py-2 text-sm leading-5 hover:bg-gray-50"
                                    onClick={() => handleSelectPosition(position.title)}
                                >
                                    <div className="ml-3 flex flex-row items-center gap-x-5 text-base">
                                        <div className="h-fit w-fit overflow-hidden rounded-md border border-gray-900/25 bg-white p-5">
                                            <Image
                                                width={60}
                                                height={60}
                                                alt={position?.title}
                                                src={position?.bannerUrl}
                                                className="group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-y-1 text-xs">
                                            <span className="text-sm font-semibold">{position.title}</span>
                                            <span>{position.admin.companyName}</span>
                                            <span>
                                                {position.cityLocation}, {position.provinceLocation}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}

            {/* Mobile only */}
            <button className="bg-reseda-green hover:bg-reseda-green/75 mt-5 flex w-full gap-x-2 rounded-md p-6 sm:hidden sm:rounded-none sm:rounded-r-md">
                <MagnifyingGlassIcon className="h-5 w-5 text-white" />
                <span className="font-medium text-white">Cari</span>
            </button>
        </>
    );
}
