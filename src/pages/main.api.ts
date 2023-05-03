import { axiosInstance } from "../utils/axios";

export function getUserDetails(id: string) {
    return axiosInstance.get(`/user/${id}`).then(res => res.data);
}