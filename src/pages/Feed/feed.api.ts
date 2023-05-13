import { axiosInstance } from "../../utils/axios"

export function getFeed() {
    return axiosInstance.get('/user/feed').then(res => res.data)
}