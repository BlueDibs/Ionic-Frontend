import { axiosInstance } from "../../utils/axios"

export function getFeed() {
    return axiosInstance.get('/user/feed').then(res => res.data)
}

export function likePost(postId: string) {
    return axiosInstance.post(`/user/like/${postId}`)
}

export function unLikePost(postId: string) {
    return axiosInstance.post(`/user/unlike/${postId}`)
}