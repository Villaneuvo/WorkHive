import Link from "next/link";

export default function JobDetailPage() {
    return (
        <div className="container py-10">
            <h1>JobDetailPage</h1>
            <Link className="hover:underline" href={`/jobs/ini-detail-job/apply`}>
                Apply Job
            </Link>
        </div>
    );
}
