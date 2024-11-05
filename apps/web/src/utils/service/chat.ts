import axios from "axios";
const instance = axios.create();

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const storeUserChat = async (payload: { senderId: number; recipientId: number; message: string }) => {
    try {
        const res = await instance.post(`${baseURL}/chat/send`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const getChatHistory = async (payload: { senderId: number; recipientId: number }) => {
    try {
        const res = await instance.post(`${baseURL}/chat/history`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

export const getChatList = async (token: string) => {
    try {
        const res = await instance.get(`${baseURL}/chat/list`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};
