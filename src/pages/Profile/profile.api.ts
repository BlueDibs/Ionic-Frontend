import { axiosInstance } from "../../utils/axios"
import { updateProfileSchema } from "./profile.schema"

export function updateProfile(body: Zod.infer<typeof updateProfileSchema>) {
    return axiosInstance.patch(`/user`, body, { headers: { "Content-Type": 'multipart/form-data' } })
}

export function fetchPosts(id: string) {
    return axiosInstance.get(`/post/${id}`).then((res) => res.data)
}
