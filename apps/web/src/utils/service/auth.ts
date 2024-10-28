import axios from "axios";
const instance = axios.create();

type RegisterPayload = {
    email: string;
    password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
    try {
        const res = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};
