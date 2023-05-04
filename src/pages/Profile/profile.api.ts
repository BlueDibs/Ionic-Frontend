import { axiosInstance } from "../../utils/axios"
import { updateProfileSchema } from "./profile.schema"

export function updateProfile(body: Zod.infer<typeof updateProfileSchema>) {
    return axiosInstance.patch(`/user`, body)
}