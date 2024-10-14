interface JobPost {
    id: string;
    title: string;
    description: string;
    bannerUrl: string;
    category: string;
    cityLocation: string;
    salary: number;
    applicationDeadline: Date;
    adminId: string;
    published: boolean;
    jobApplications: JobApplication[];
}

interface JobApplication {
    id: number;
    jobId: number;
    userId: number;
    cvUrl: string;
    expectedSalary: number;
}
