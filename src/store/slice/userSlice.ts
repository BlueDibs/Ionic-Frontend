import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface UserState {
    id: string;
    firebaseId: string;
    email: string;
    username: string;
    bio: string;
    followers: number;
    following: number;
}


export const userSlice = createSlice({
    name: 'user',
    initialState: {} as UserState,
    reducers: {
        setUser(user, action: PayloadAction<any>) {
            console.log(action.payload)
            user = { ...action.payload, followers: action.payload.followersIDs.length, following: action.payload.followingIDs.length }
            return user
        }
    }
})

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;