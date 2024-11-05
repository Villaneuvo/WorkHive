import axios from "axios";
const instance = axios.create();

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const applyJob = async (payload: { cv: File; expectedSalary: number; userId: number; jobId: number }) => {
    try {
        const res = await instance.post(`${baseURL}/jobposts/apply`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};