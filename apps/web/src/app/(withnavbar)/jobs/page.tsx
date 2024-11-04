import Link from "next/link";

const joblist = [
    {
        name: "Software Engineer",
        slug: "software-engineer",
        company: "Google",
        location: "Mountain View, CA",
        salary: "100,000",
        description: "Software Engineer at Google",
    },
    {
        name: "Front End Engineer",
        slug: "front-end-engineer",
        company: "Facebook",
        location: "Menlo Park, CA",
        salary: "120,000",
        description: "Software Engineer at Facebook",
    },
    {
        name: "Backend Engineer",
        slug: "backend-engineer",
        company: "Amazon",
        location: "Seattle, WA",
        salary: "110,000",
        description: "Software Engineer at Amazon",
    },
];

export default function JobList() {
    return (
        <div className="container">
            <ul className="py-10">
                {joblist.map((job) => {
                    return (
                        <li key={job.slug}>
                            <Link className="hover:underline" href={`/jobs/${job.slug}`}>
                                {job.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
