import { axiosInstance } from "../../utils/axios";

export function getFeedsByUsername(username: string) {
    return axiosInstance.get(`user/feeds/${username}`).then(res => res.data)
}