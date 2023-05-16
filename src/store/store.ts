import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice';

import notificationSlice from './slice/notificationSlice';

export const store = configureStore({
    devTools: true,
    reducer: {
        user: userSlice,
        notifications: notificationSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;