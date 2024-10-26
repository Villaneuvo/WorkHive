export interface Job {
    id: string;
    title: string;
    bannerUrl: string;
    description: string;
    admin: {
        companyName: string;
    };
    adminId: string;
    category: string;
    title: string;
    bannerUrl: string;
    admin: {
        companyName: string;
    };
    cityLocation: string;
    provinceLocation: string;
    salary: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    applicationDeadline: string;
}

export interface Company {
    id: string;
    companyName: string;
    companyDescription: string;
    companyBannerImg: string;
    companyCityLocation: string;
    companyProvince: string;
    phoneNumber: string;
    applicationDeadline: string;
}

export interface SearchJobPosition {
    id: string;
    title: string;
    bannerUrl: string;
    admin: { companyName: string };
    cityLocation: string;
    provinceLocation: string;
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