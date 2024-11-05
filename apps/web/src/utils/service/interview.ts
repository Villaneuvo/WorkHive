import axios from "axios";
const instance = axios.create();

const baseURL = process.env.NEXT_PUBLIC_API_URL;

//get all interview schedule
export const getAllInterviewSchedule = async () => {
    try {
        const res = await instance.get(`${baseURL}/interview-schedule/list`);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//create interview schedule
export const createInterviewSchedule = async (payload: any) => {
    try {
        const res = await instance.post(`${baseURL}/interview-schedule/create`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//update interview schedule
export const updateInterviewSchedule = async (payload: any) => {
    try {
        const res = await instance.put(`${baseURL}/interview-schedule/update/${payload.id}`, payload);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//delete interview schedule
export const deleteInterviewSchedule = async (id: number) => {
    try {
        const res = await instance.delete(`${baseURL}/interview-schedule/delete/${id}`);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//get interview schedule by id
export const getInterviewScheduleById = async (id: number) => {
    try {
        const res = await instance.get(`${baseURL}/interview-schedule/${id}`);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};

//get all available users
export const getAllAvailableUsers = async () => {
    try {
        const res = await instance.get(`${baseURL}/interview-schedule/available-user`);
        return await Promise.resolve(res.data);
    } catch (err) {
        return await Promise.reject(err);
    }
};
