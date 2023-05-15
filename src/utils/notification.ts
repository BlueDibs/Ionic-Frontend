import { push, ref } from "firebase/database";
import { database } from "./firebase";


export function NotifyUser(userId: string, data: any) {
    const notificationRef = ref(database, `notifications/${userId}`);
    push(notificationRef, data)
}