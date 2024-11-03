export interface Job {
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

export interface Company {
    id: string;
    companyName: string;
    companyDescription: string;
    companyBannerImg: string;
    companyCityLocation: string;
    companyProvince: string;
    phoneNumber: string;
}

export interface SearchJobPosition {
    id: string;
    title: string;
    bannerUrl: string;
    admin: { companyName: string };
    cityLocation: string;
    provinceLocation: string;
}

export interface SkillAssessment {
    id: number;
    skillName: string;
    description?: string;
    questions: Question[];
}

export interface Question {
    id: number;
    questionText: string;
    choices: Choice[];
}

export interface Choice {
    id: number;
    text: string;
    questionId: number;
}

export interface CloudinaryUrl {
    url: string;
}

export interface JobApplication {
    id: number;
    jobId: number;
    userId: number;
    cvUrl: string;
    expectedSalary: number;
}
export interface Params {
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
