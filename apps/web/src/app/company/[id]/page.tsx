"use client";

import { Container } from "@/components/Container";
import RelatedJob from "@/components/section/related-job/RelatedJob";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import RatingModal from "@/components/RatingModal";
import RatingTimelineModal from "@/components/RatingTimeline";

export default function DetailCompanyPage({ params }: { params: { id: string } }) {
    const [company, setCompany] = useState({
        companyName: "",
        companyDescription: "",
        companyCityLocation: "",
        companyProvince: "",
        companyBannerImg: "",
        phoneNumber: "",
        ratings: [] as Array<{ rating: number; createdAt: string }>,
        totalReviews: 0,
    });
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isAnonymous, setIsAnonymous] = useState(false);

    useEffect(() => {
        async function fetchCompany() {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/jobposts/company/${params.id}`,
                );
                const data = res.data;
                setCompany(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCompany();
    }, [params.id]);

    const calculateAverageRating = (ratings: Array<{ rating: number }>) => {
        if (ratings.length === 0) return 0;
        const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
        return (total / ratings.length).toFixed(1);
    };

    const handleSubmitRating = async () => {
        if (userRating !== null) {
            try {
                const data: { adminId: number; rating: number; userId?: number } = {
                    adminId: Number(params.id),
                    rating: userRating,
                };
                if (!isAnonymous) data.userId = 1; // Add userId only if not anonymous

                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/company/${params.id}/rate`, data);

                const updatedRatings = [
                    ...company.ratings,
                    { rating: userRating, createdAt: new Date().toISOString() },
                ];
                setCompany((prev) => ({
                    ...prev,
                    ratings: updatedRatings,
                    totalReviews: prev.totalReviews + 1,
                }));

                setIsRatingModalOpen(false);
                setUserRating(null);
                setIsAnonymous(false);
            } catch (error) {
                console.error("Error submitting rating:", error);
            }
        }
    };

    const handleOpenRatingModal = () => {
        setIsRatingModalOpen(true);
    };

    const handleCloseRatingModal = () => {
        setIsRatingModalOpen(false);
    };

    const handleOpenHistoryModal = () => {
        setIsHistoryModalOpen(true);
    };

    const handleCloseHistoryModal = () => {
        setIsHistoryModalOpen(false);
    };

    return (
        <div className="bg-white">
            <Container>
                <div
                    className="h-64 w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    }}
                ></div>

                <div className="mx-auto -mt-16 flex max-w-4xl flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg">
                    <Image
                        src={company.companyBannerImg}
                        alt={`${company.companyName} Logo`}
                        width={1000}
                        height={1000}
                        className="h-24 w-fit border-4 border-white object-cover shadow-lg"
                    />

                    <div className="mt-4 text-center">
                        <h2 className="text-2xl font-bold text-gray-800">{company.companyName}</h2>
                        <p className="mt-2 text-gray-500">{company.companyDescription}</p>
                        <p className="mt-2 text-gray-500">
                            {company.companyCityLocation}, {company.companyProvince}
                        </p>
                        <p className="mt-2 text-gray-500">Phone: {company.phoneNumber}</p>
                        <p className="mt-2 text-gray-500">
                            Average Rating: {calculateAverageRating(company.ratings)} / 5 ({company.totalReviews}{" "}
                            reviews)
                        </p>

                        <div className="flex justify-center gap-x-2">
                            <button
                                onClick={handleOpenRatingModal}
                                className="bg-reseda-green hover:bg-reseda-green/75 mt-4 rounded px-4 py-2 text-white"
                            >
                                Rate Company
                            </button>

                            <button
                                onClick={handleOpenHistoryModal}
                                className="bg-reseda-green hover:bg-reseda-green/75 mt-4 rounded px-4 py-2 text-white"
                            >
                                View Rating History
                            </button>
                        </div>
                    </div>
                </div>

                <div className="my-10">
                    <h2 className="text-reseda-green mb-5 text-2xl font-medium">Lowongan kerja yang tersedia</h2>
                    <RelatedJob params={{ adminId: params.id }} />
                </div>

                {isRatingModalOpen && (
                    <RatingModal
                        handleCloseModal={handleCloseRatingModal}
                        handleFinish={handleSubmitRating}
                        isAnonymous={isAnonymous}
                        setIsAnonymous={setIsAnonymous}
                    >
                        <h3 className="mb-4 text-lg font-semibold">Rate {company.companyName}</h3>
                        <p className="mb-2">Select a rating:</p>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <button
                                    key={rating}
                                    onClick={() => setUserRating(rating)}
                                    className={`rounded-full px-3 py-1 ${
                                        userRating === rating ? "bg-reseda-green text-white" : "bg-gray-300"
                                    }`}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                        <label className="mt-4 block">
                            <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="mr-2"
                            />
                            Submit Anonymously
                        </label>
                    </RatingModal>
                )}

                {isHistoryModalOpen && (
                    <RatingTimelineModal handleCloseModal={handleCloseHistoryModal}>
                        <h3 className="mb-4 text-lg font-semibold">Rating History</h3>
                        <ul className="max-h-60 overflow-y-auto">
                            {company.ratings.length > 0 ? (
                                company.ratings.map((rating, index) => (
                                    <li key={index} className="flex justify-between border-b py-2 text-gray-500">
                                        <span>{new Date(rating.createdAt).toLocaleDateString()}</span>
                                        <span>{rating.rating} / 5</span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500">No ratings yet.</li>
                            )}
                        </ul>
                    </RatingTimelineModal>
                )}
            </Container>
        </div>
    );
}
