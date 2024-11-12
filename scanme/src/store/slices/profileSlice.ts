import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import mainApi from '../../services/instance/MainInstance';
import { IEditUser, IGetMeProfile, } from '../../interfaces/types';
import { profilesSelector, userInfoSelector } from '../selectors/profileSelector';
import { RootState } from '../config/configStore';
import { setCardsList } from './cardSlice';
import i18next from 'i18next';
import { setError } from './administrativSlice';

export interface IProfile {
  userInfo?: IGetMeProfile
  profiles: any[],
  imageUrl: string
  userCard: any
}

const initialState: IProfile = {
  userInfo: undefined,
  profiles: [],
  imageUrl: "",
  userCard: undefined
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IGetMeProfile | undefined>) => {
      state.userInfo = action.payload
    },
    setUserCard: (state, action: PayloadAction<IGetMeProfile | undefined>) => {
      state.userCard = action.payload
    },
    setProfiles: (state, action: PayloadAction<any | undefined>) => {
      state.profiles = action.payload
    },
    setUserImage: (state, action: PayloadAction<any | undefined>) => {
      state.imageUrl = action.payload
    },
    clearUserInfo(state) {
      state.userInfo = undefined
    },
  }
})

export const getUserInfo = (email: string) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.get(`user/email?email=${email}`);
    if (response.data) {
      dispatch(setUserInfo(response?.data))
    }
  } catch (err: any) {
  }
}

export const getProfiles = (payload: any) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const response = await mainApi.get(`user/card/search?query=${payload.search_by}&page=${payload.pagination.page}&size=${10}`);
    if (response.data) {
      if (payload.pagination.page !== 0) {
        const currentProfiles = profilesSelector(getState());
        const list = currentProfiles?.concat(response.data.content)
        dispatch(setProfiles(list))
      }
      else
        dispatch(setProfiles(response?.data.content))
    }
  } catch (err: any) {
    console.log(err, 'hhhhhhhhhhhhhhh');

  }
}

export const editUserInfo = (payload: IEditUser, cb: (id: any) => void) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.put(`user/${payload.id}`, payload.info);
    if (response.data) {
      dispatch(setUserInfo(response?.data))
      cb(response.data.email)
    } else {
      const data: any = {
        title: i18next.t(`Errors.Error_message_title`),
        text: "Edit information failed",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }

  } catch (err: any) {
    console.log(err);
  }
};

export const editUserPicture = (payload: any, cb: () => void) => async (dispatch: Dispatch) => {
  try {
    const formData: any = new FormData()
    formData.append('file', {
      uri: payload.imageUri.uri,
      type: payload.imageUri.mimeType,
      name: payload.imageUri.fileName
    });
    const response = await mainApi.post(`user/upload/${payload.id}`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.data) {
      dispatch(setUserImage(response.data.profileImage))
      cb()
    }
  } catch (err: any) {
    console.log({ err });
  }
};

export const editCardPicture = (payload: any) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const formData: any = new FormData()
    formData.append('file', {
      uri: payload.imageUri.uri,
      type: payload.imageUri.mimeType,
      name: payload.imageUri.fileName
    });
    await mainApi.post(`user/card/update/image/${payload.id}?type=PROFILE_PIC`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } });
    const user = userInfoSelector(getState())
    const response = await mainApi.get(`user/card/findAll?userId=${user?.id}`);
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
    console.log({ err });
  }
};

export const deleteCardPicture = (payload: any) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const formData: any = new FormData()
    formData.append('file', null);
    await mainApi.post(`user/card/update/image/${payload.id}?type=PROFILE_PIC`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } });
    const user = userInfoSelector(getState())
    const response = await mainApi.get(`user/card/findAll?userId=${user?.id}`);
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
    console.log({ err });
  }
};

export const deleteUserPicture = (payload: any) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const formData: any = new FormData()
    formData.append('file', null);
    const response = await mainApi.post(`user/upload/${payload.id}`, formData,
      { headers: { 'Content-Type': 'multipart/form-data' } });
    if (response.data) {
      dispatch(setUserImage(response.data.profileImage,))
      const user = userInfoSelector(getState());
      const deletedUser = { ...user, profilePic: null }
      //@ts-ignore
      dispatch(setUserInfo(deletedUser))
    }
  } catch (err: any) {
    console.log({ err });
  }
};


export const { setUserInfo, setProfiles, clearUserInfo, setUserImage, } = profileSlice.actions


export default profileSlice.reducer