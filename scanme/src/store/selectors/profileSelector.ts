import { RootState } from "../config/configStore";

export const userInfoSelector = (state: RootState) => state.profileReducer.userInfo
export const profilesSelector = (state: RootState) => state.profileReducer.profiles
export const profileImageSelector = (state: RootState) => state.profileReducer.imageUrl
export const profileCardSelector = (state: RootState) => state.profileReducer.userCard
