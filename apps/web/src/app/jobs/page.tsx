"use client";

import JobPostList from "@/components/section/jobpost-list/JobPostList";
import { store } from "@/store/store";
import { Provider } from "react-redux";

export default function Page() {
    return (
        <Provider store={store}>
            <JobPostList />
        </Provider>
    );
}
