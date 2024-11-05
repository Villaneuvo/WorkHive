import axios from "axios";
const instance = axios.create();

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type RegisterPayload = {
    email: string;
    password: string;
};

type AdminRegisterPayload = {
    email: string;
    companyName: string;
    phoneNumber: string;
    password: string;
};

export const loginUser = async (payload: { email: string; password: string }) => {
    try {
        const res = await instance.post(`${baseURL}/auth/login`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const registerUser = async (payload: RegisterPayload) => {
    try {
        const res = await instance.post(`${baseURL}/auth/register`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const registerAdmin = async (payload: AdminRegisterPayload) => {
    try {
        const res = await instance.post(`${baseURL}/auth/admin/register`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const changePasswordUser = async (payload: { password: string; token: string }) => {
    try {
        const res = await instance.post(`${baseURL}/auth/reset-password`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const forgotPasswordUser = async (payload: { email: string }) => {
    try {
        const res = await instance.post(`${baseURL}/auth/forgot-password`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const verifyUserRegis = async (payload: { token: string }) => {
    try {
        const res = await instance.post(`${baseURL}/auth/verify`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};
