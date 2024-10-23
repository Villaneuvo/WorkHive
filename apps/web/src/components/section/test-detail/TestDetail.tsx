import { Container } from "@/components/Container";
import { BsClipboard2Check } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import Image from "next/image";
import { SkillAssessment } from "@/utils/interfaces";

export default function TestDetail({
    skillAssessment,
    setIsOpen,
}: {
    skillAssessment: SkillAssessment;
    setIsOpen: (value: boolean) => void;
}) {
    return (
        <div className="bg-white">
            <Container className="my-5 rounded-lg bg-zinc-100 p-5">
                <div className="my-2 h-fit w-fit">
                    <Image
                        src={`https://skillicons.dev/icons?i=${skillAssessment?.skillName.toLowerCase()}`}
                        height={60}
                        width={60}
                        alt="skill-icon"
                    />
                </div>
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{skillAssessment?.skillName} Assessment</h3>
                    <p className="text-sm leading-relaxed lg:w-3/5">{skillAssessment?.description}</p>
                </div>
                <div className="my-5">
                    <ul className="flex flex-col gap-y-2 text-sm">
                        <li className="flex gap-x-2">
                            <FiClock className="h-5 w-5" />
                            <span className="font-semibold">{skillAssessment?.questions.length} </span> multiple choices
                            questions
                        </li>
                        <li className="flex gap-x-2">
                            <FaList className="h-5 w-5" />
                            <span className="font-semibold">1.2</span> minutes each question
                        </li>
                        <li className="flex gap-x-2">
                            <BsClipboard2Check className="h-5 w-5" />
                            Score must be higher or equal than <span className="font-semibold">75</span> to earn badge
                        </li>
                    </ul>
                </div>
                <div className="mb-5 mt-10 w-full border border-gray-900/25" />
                <div className="flex w-full justify-end">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-reseda-green hover:bg-reseda-green/70 rounded-md p-2 font-medium text-white transition delay-100 duration-300"
                    >
                        Start Test
                    </button>
                </div>
            </Container>
        </div>
    );
}
