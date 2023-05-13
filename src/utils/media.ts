import { config } from "../config";

export function imgUrl(path: string | undefined) {
    if (!path) return null;
    return `${config.STATIC_FILE_BASE_URL}${path}?alt=media`
}