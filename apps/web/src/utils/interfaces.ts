export interface User {
    id: string;
    email: string;
    name: string;
    age: number;
    educationalBackground: string;
    photoUrl: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    subscription: Subscription;
    cv: CV;
}

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
    user: User;
    status: string;
    cvUrl: string;
    expectedSalary: number;
    createdAt: string;
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
export interface SnapWindow extends Window {
    snap?: { embed: (token: string, options: { embedId: string }) => void };
}
export interface Subscription {
    id: number;
    userId: number;
    subscriptionType: string;
    quotaAssessment: number;
    isActive: boolean;
    isApproved: string;
    transferProof: string;
    endDate: string;
    user: User;
}
export interface CV {
    id: number;
    userId: number;
    user: User;
    cvUrl: string;
    phoneNumber: string;
    education: EducationCV;
    experiences: ExperienceCV[];
    skills: string;
}
export interface EducationCV {
    id: number;
    cvId: number;
    cv: CV;
    education: string;
    institution: string;
    major: string;
    finalGrade: Float32Array;
    graduationDate: string;
}
export interface ExperienceCV {
    id: number;
    cvId: number;
    cv: CV;
    position: string;
    company: string;
    workingPeriod: string;
    description: string[];
}
export interface Certificate {
    id: number;
    title: string;
    status: string;
    completionDate: Date;
    expiredDate: Date;
    pdfUrl: string;
    verificationCode: string;
    userId: number;
    user: User;
    skillAssessmentId: number;
    skillAssessment: SkillAssessment;
}
