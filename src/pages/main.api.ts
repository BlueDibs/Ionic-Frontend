import { axiosInstance } from "../utils/axios";

export function getUserDetails() {
    return axiosInstance.get(`/user`).then(res => res.data);
}

export function addPost(id: string, file: File) {
    return axiosInstance.post(`/post/${id}`, { file }, { headers: { "Content-Type": 'multipart/form-data' } })
}