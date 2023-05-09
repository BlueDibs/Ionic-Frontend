import { axiosInstance } from "../../utils/axios";

export function fetchUserDetails(userId: string) {
    return axiosInstance.get(`/user/${userId}`).then(res => res.data)
}