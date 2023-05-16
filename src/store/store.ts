import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice';

import notificationSlice from './slice/notificationSlice';
import notificationUnreadSlice from './slice/notificationUnreadSlice';

export const store = configureStore({
    devTools: true,
    reducer: {
        user: userSlice,
        notifications: notificationSlice,
        NotificationUnread: notificationUnreadSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;