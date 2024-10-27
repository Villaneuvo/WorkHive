import { useRouter } from "next/navigation";

export default function TimesUp() {
    const router = useRouter();
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="rounded-lg bg-white p-5">
                <h4 className="mb-4 text-lg font-semibold">{`Time's Up!`}</h4>
                <p>You have run out of time to complete the quiz.</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => router.push(`/skill-assessment/`)}
                        className="bg-reseda-green rounded px-4 py-2 text-white"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
