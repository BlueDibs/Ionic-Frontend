import { axiosInstance } from "../utils/axios";

export function getUserDetails() {
    return axiosInstance.get(`/user`).then(res => res.data);
}

export function addPost(file: File) {
    return axiosInstance.post(`/post`, { file })
}