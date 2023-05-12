import { config } from "../config";

export function imgUrl(path: string | undefined) {
    console.log(path)
    if (!path) return null;
    return `${config.STATIC_FILE_BASE_URL}${path}?alt=media`
}