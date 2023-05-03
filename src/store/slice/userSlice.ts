import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
    id: string;
    username: string;
}


export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setUser(state, action: PayloadAction<(state: object) => void>) {
            action.payload(state);
        }
    }
})

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;