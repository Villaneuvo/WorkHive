"use client";

import { Choice, SkillAssessment } from "@/utils/interfaces";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import TestDetail from "@/components/section/test-detail/TestDetail";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Container } from "@/components/Container";
import TimesUp from "@/components/TimesUp";

export default function SkillAssessmentQuizPage({ params }: { params: { id: string; skillName: string } }) {
    const router = useRouter();
    const [skillAssessment, setSkillAssessment] = useState<SkillAssessment | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Array<{ question: string; answer: string; answerIdx: number }>>([]);
    const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
    const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(30 * 60);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/skill-assessment/quiz/${params.id}`,
                );
                const data = res.data.data[0];
                setSkillAssessment(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [params.id]);

    const handleFinish = async () => {
        if (selectedAnswerId !== null && selectedAnswerIdx !== null) {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = {
                question: skillAssessment!.questions[currentQuestionIndex].questionText,
                answer: skillAssessment!.questions[currentQuestionIndex].choices[selectedAnswerIdx].text,
                answerIdx: selectedAnswerIdx,
            };
            setAnswers(updatedAnswers);

            setIsSubmitting(true);

            try {
                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/skill-assessment/submit-assessment`,
                    {
                        userId: 1, // TODO: Dummy for now
                        assessmentId: skillAssessment!.id,
                        userAnswers: updatedAnswers.map((ans) => ({
                            question: ans.question,
                            answerIdx: ans.answerIdx + 1,
                        })),
                    },
                );

                console.log("Assessment Result:", response.data);
                router.push(`/skill-assessment/`);
            } catch (error) {
                console.error("Error submitting answers:", error);
                alert("There was an error submitting your assessment.");
            } finally {
                setIsSubmitting(false);
                setIsModalOpen(false);
            }
        }
    };

    useEffect(() => {
        if (isOpen) {
            setIsTimeUp(false);
            timerRef.current = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 0) {
                        clearInterval(timerRef.current!);
                        setIsTimeUp(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [isOpen]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleSelectAnswer = (answerId: number, answerText: string, idx: number) => {
        setSelectedAnswerId(answerId);
        setSelectedAnswerIdx(idx);
    };

    const handleNextQuestion = () => {
        if (selectedAnswerId !== null && selectedAnswerIdx !== null) {
            const updatedAnswers = [...answers];
            updatedAnswers[currentQuestionIndex] = {
                question: skillAssessment!.questions[currentQuestionIndex].questionText,
                answer: skillAssessment!.questions[currentQuestionIndex].choices[selectedAnswerIdx].text,
                answerIdx: selectedAnswerIdx,
            };
            setAnswers(updatedAnswers);

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswerId(null);
            setSelectedAnswerIdx(null);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            {!isOpen ? (
                <TestDetail skillAssessment={skillAssessment!} setIsOpen={setIsOpen} />
            ) : (
                <div>
                    <Container className="my-5 rounded-lg bg-gray-300/25 p-5 sm:mx-14 xl:mx-auto">
                        {isTimeUp ? (
                            <TimesUp />
                        ) : (
                            <div>
                                <div className="text-right text-lg font-semibold text-red-500">
                                    Time Remaining: {formatTime(timeRemaining)}
                                </div>

                                <h3 className="mb-3 text-xl font-semibold">Question {currentQuestionIndex + 1}</h3>
                                {skillAssessment?.questions.map((question, index) => {
                                    if (index === currentQuestionIndex) {
                                        return (
                                            <div key={index}>
                                                <p className="text-sm leading-relaxed lg:w-3/5">
                                                    {question.questionText}
                                                </p>
                                                <ul className="flex flex-col gap-y-2 text-sm">
                                                    {question.choices.map((answer: Choice, idx: number) => (
                                                        <li key={answer.id} className="flex gap-x-2">
                                                            <input
                                                                type="radio"
                                                                name={`answer-${currentQuestionIndex}`}
                                                                id={`${answer.id}`}
                                                                value={answer.id}
                                                                checked={selectedAnswerId === answer.id}
                                                                onChange={() =>
                                                                    handleSelectAnswer(answer.id, answer.text, idx)
                                                                }
                                                                required
                                                            />
                                                            <label htmlFor={`${answer.id}`}>{answer.text}</label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}

                                {skillAssessment && currentQuestionIndex < skillAssessment.questions.length - 1 ? (
                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={selectedAnswerId === null}
                                        className={`mt-4 rounded px-4 py-2 ${
                                            selectedAnswerId !== null ? "bg-reseda-green text-white" : "bg-gray-300"
                                        }`}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleOpenModal}
                                            disabled={selectedAnswerId === null || isSubmitting}
                                            className={`mt-4 rounded px-4 py-2 ${
                                                selectedAnswerId !== null ? "bg-reseda-green text-white" : "bg-gray-300"
                                            }`}
                                        >
                                            Finish
                                        </button>

                                        {isModalOpen && (
                                            <ConfirmationModal
                                                handleCloseModal={handleCloseModal}
                                                handleFinish={handleFinish}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </Container>
                </div>
            )}
        </>
    );
}
