import axios from "axios";
const instance = axios.create();

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserProfile = async (token: string) => {
    try {
        const res = await instance.get(`${baseURL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//get public profile
export const getPublicProfile = async (userId: number) => {
    try {
        const res = await instance.get(`${baseURL}/user/public/${userId}`);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};
