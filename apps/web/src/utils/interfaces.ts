interface SearchJobPosition {
    id: string;
    title: string;
    bannerUrl: string;
    admin: { companyName: string };
    cityLocation: string;
    provinceLocation: string;
}

interface CloudinaryUrl {
    url: string;
}

interface JobPost {
    id: string;
    title: string;
    description: string;
    bannerUrl: string;
    category: string;
    cityLocation: string;
    provinceLocation: string;
    type: string;
    salary: number;
    applicationDeadline: Date;
    adminId: string;
    admin: {
        companyName: string;
    };
    published: boolean;
    jobApplications: JobApplication[];
    createdAt: string;
}

interface JobApplication {
    id: number;
    jobId: number;
    userId: number;
    cvUrl: string;
    expectedSalary: number;
}
