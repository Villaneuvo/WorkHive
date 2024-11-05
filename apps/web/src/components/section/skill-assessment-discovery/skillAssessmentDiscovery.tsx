"use client";

import { Container } from "@/components/Container";
import { SkillAssessment, User } from "@/utils/interfaces";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/Badge";

export default function SkillAssessmentDiscovery({ userId }: { userId: string }) {
    const [skillAssessment, setSkillAssessment] = useState<SkillAssessment[]>([]);
    const [user, setUser] = useState<Partial<User>>({});

    useEffect(() => {
        // Fetch data from API
        async function fetchData() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/skill-assessment/quiz/`);
                const resUser = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/subscriptions/userId/${userId}`,
                );
                const data = res.data.data;
                setSkillAssessment(data);
                setUser(resUser.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [userId]);

    return (
        <div className="bg-white">
            <Container className="my-5 rounded-lg bg-gray-300/25 p-5 sm:mx-14 xl:mx-auto">
                {/* Title Section */}
                <div className="w-full">
                    <h3 className="text-2xl font-semibold text-gray-900">Skill Assessment</h3>
                    {user.subscription?.isActive ? (
                        <>
                            <p className="text-sm text-gray-500">
                                Skill Assessment Quota:{" "}
                                {user.subscription?.subscriptionType === "STANDARD"
                                    ? user.subscription?.quotaAssessment || 0
                                    : "Unlimited"}
                            </p>
                            <p className="my-1 text-sm">
                                Your Badge:{" "}
                                {(user.certificate || []).length <= 2 ? (
                                    <Badge color="yellow">Beginner</Badge>
                                ) : (user.certificate || []).length <= 5 ? (
                                    <Badge color="blue">Intermediate</Badge>
                                ) : (user.certificate || []).length <= 10 ? (
                                    <Badge color="purple">Advanced</Badge>
                                ) : (user.certificate || []).length <= 20 ? (
                                    <Badge color="green">Expert</Badge>
                                ) : (
                                    <Badge color="red">Master</Badge>
                                )}
                            </p>
                        </>
                    ) : (
                        <span className="text-sm">Subscribe to take the test and get a certificate</span>
                    )}
                    <p className="my-4 text-sm leading-relaxed lg:w-3/5">
                        Test your skill and get a job that suits you best with our skill assessment test. We provide a
                        variety of tests that you can take to find out your skills and abilities. Earn a badge for each
                        test by passing the test.
                    </p>
                </div>

                {/* Solid line div*/}
                <div className="my-5 border-b-2 border-gray-300"></div>

                {/* Card Section */}
                <div>
                    {skillAssessment.map((item) => (
                        <div key={item.id} className="my-5 rounded-lg bg-white p-5 shadow-md">
                            <div className="flex gap-x-8">
                                <div className="h-fit w-fit">
                                    <Image
                                        src={`https://skillicons.dev/icons?i=${item.skillName.toLowerCase()}`}
                                        height={100}
                                        width={100}
                                        alt={"jeje"}
                                    />
                                </div>
                                <div className="flex w-3/4 flex-col justify-center">
                                    <h4>{item.skillName}</h4>
                                    <p>{item.description}</p>
                                </div>
                                <div className="flex items-center">
                                    {user.subscription?.isActive &&
                                        (user.subscription?.subscriptionType === "STANDARD"
                                            ? user.subscription?.quotaAssessment > 0
                                            : true) && (
                                            <Link
                                                href={`skill-assessment/quiz/${item.id}`}
                                                className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                                            >
                                                Take Test
                                            </Link>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
