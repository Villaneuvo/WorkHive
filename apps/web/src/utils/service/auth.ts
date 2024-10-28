import axios from "axios";
const instance = axios.create();

type RegisterPayload = {
    email: string;
    password: string;
};

export const registerUser = (payload: RegisterPayload) => {
    return instance
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, payload)
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response));
};
