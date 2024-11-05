"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/Button";
import TextField from "@/components/TextField";
import { useSession } from "next-auth/react";

export default function SkillAssessmentForm() {
    const [formData, setFormData] = useState({
        skillName: "",
        description: "",
        questions: [{ questionText: "", choices: ["", "", "", ""], correctAnswerId: 0 }],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const { data: session } = useSession();
    if (session?.user?.role !== "DEVELOPER") {
        window.location.href = "/";
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index: number, field: string, value: string | number) => {
        setFormData((prevData) => {
            const questions = [...prevData.questions];
            questions[index] = { ...questions[index], [field]: value };
            return { ...prevData, questions };
        });
    };

    const handleChoiceChange = (qIndex: number, choiceIndex: number, value: string) => {
        setFormData((prevData) => {
            const questions = [...prevData.questions];
            questions[qIndex].choices[choiceIndex] = value;
            return { ...prevData, questions };
        });
    };

    const addQuestion = () => {
        if (formData.questions.length < 25) {
            setFormData((prevData) => ({
                ...prevData,
                questions: [...prevData.questions, { questionText: "", choices: ["", "", "", ""], correctAnswerId: 0 }],
            }));
        }
    };

    const removeQuestion = (index: number) => {
        setFormData((prevData) => ({
            ...prevData,
            questions: prevData.questions.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.skillName) newErrors["skillName"] = "Skill name is required";
        if (!formData.description) newErrors["description"] = "Description is required";

        formData.questions.forEach((question, index) => {
            if (!question.questionText) newErrors[`questionText_${index}`] = "Question text is required";
            if (question.choices.some((choice) => !choice)) {
                newErrors[`choices_${index}`] = "All choices are required";
            }
            if (question.correctAnswerId < 0 || question.correctAnswerId > 3) {
                newErrors[`correctAnswerId_${index}`] = "Correct answer must be between 0 and 3";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL_API}/api/v1/skill-assessment/skill-assessment-creation`,
                formData,
            );
            alert("Skill Assessment Created Successfully");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating skill assessment:", error);
        }
    };

    return (
        <form className="mx-auto my-10 max-w-2xl space-y-6 rounded-md bg-white p-6 shadow-md" onSubmit={handleSubmit}>
            <h1 className="mb-4 text-center text-2xl font-bold">Create Skill Assessment</h1>
            <TextField
                label="Skill Name"
                name="skillName"
                value={formData.skillName}
                onChange={handleInputChange}
                errorMessage={errors.skillName}
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                errorMessage={errors.description}
            />

            {formData.questions.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4 rounded-md border p-4">
                    <TextField
                        label={`Question ${qIndex + 1}`}
                        name={`questionText_${qIndex}`}
                        value={question.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
                        errorMessage={errors[`questionText_${qIndex}`]}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        {question.choices.map((choice, choiceIndex) => (
                            <TextField
                                key={choiceIndex}
                                label={`Choice ${choiceIndex + 1}`}
                                name={`choice_${qIndex}_${choiceIndex}`}
                                value={choice}
                                onChange={(e) => handleChoiceChange(qIndex, choiceIndex, e.target.value)}
                                errorMessage={errors[`choices_${qIndex}`]}
                            />
                        ))}
                    </div>
                    <TextField
                        label="Correct Answer ID"
                        name={`correctAnswerId_${qIndex}`}
                        type="number"
                        min="0"
                        max="3"
                        value={question.correctAnswerId.toString()}
                        onChange={(e) =>
                            handleQuestionChange(qIndex, "correctAnswerId", parseInt(e.target.value, 10) || 0)
                        }
                        errorMessage={errors[`correctAnswerId_${qIndex}`]}
                    />
                    <Button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="w-full bg-red-500 text-white"
                    >
                        Remove Question
                    </Button>
                </div>
            ))}

            {formData.questions.length < 25 && (
                <Button type="button" onClick={addQuestion} className="w-full">
                    Add Question
                </Button>
            )}
            <Button type="submit" className="w-full bg-blue-500 text-white">
                Create Skill Assessment
            </Button>
        </form>
    );
}
