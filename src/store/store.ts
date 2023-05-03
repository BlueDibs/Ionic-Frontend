import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice';

import { composeWithDevTools } from 'redux-devtools-extension';
import { devToolsEnhancer } from 'redux-devtools-extension';

export const store = configureStore({
    devTools: true,
    reducer: {
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;