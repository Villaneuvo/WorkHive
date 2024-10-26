export interface Job {
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