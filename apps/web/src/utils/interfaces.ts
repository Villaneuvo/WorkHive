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
    updatedAt: string;
}

interface Company {
    id: string;
    companyName: string;
    companyDescription: string;
    companyBannerImg: string;
    companyCityLocation: string;
    companyProvince: string;
    phoneNumber: string;
    applicationDeadline: string;
}

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

interface JobApplication {
    id: number;
    jobId: number;
    userId: number;
    cvUrl: string;
    expectedSalary: number;
}
interface Params {
    page: number;
    limit: number;
    cityLocation?: string;
    companyName?: string;
    companyLocation?: string;
    category?: string;
    title?: string;
    provinceLocation?: string;
    sort?: string;
}
