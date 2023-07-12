import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  id: string;
  firebaseId: string;
  email: string;
  username: string;
  bio: string;
  followersIDs: string[];
  followingIDs: string[];
  PostLikedIDs: string[];
  avatarPath?: string;
  shares: number;
  equity: number;
  balance: number;
  price: number;
  INRLocked: number;
  userEquity: number;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {} as UserState,
  reducers: {
    setUser(user, action: PayloadAction<any>) {
      user = { ...action.payload };
      return user;
    },
    updateUser(user, action: PayloadAction<Partial<UserState>>) {
      user = { ...user, ...action.payload };
      return user;
    },
    follow(user, action: PayloadAction<string>) {
      user.followingIDs.push(action.payload);
      return user;
    },
    unfollow(user, action: PayloadAction<string>) {
      user.followingIDs = user.followingIDs.filter(
        (id) => id != action.payload
      );
      return user;
    },
    likePostUser(user, action: PayloadAction<string>) {
      user.PostLikedIDs.push(action.payload);
      return user;
    },
    unLikePostUser(user, action: PayloadAction<string>) {
      user.PostLikedIDs = user.PostLikedIDs.filter(
        (postId) => postId != action.payload
      );
      return user;
    },
  },
});

export const {
  setUser,
  follow,
  unfollow,
  likePostUser,
  unLikePostUser,
  updateUser,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
