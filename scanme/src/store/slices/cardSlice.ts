import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import mainApi from '../../services/instance/MainInstance';
import { ContentData, IAddCard, ICardId, ICardItem, IUserId } from '../../interfaces/types'; import { RootState } from '../config/configStore';
import { cardListSelector } from '../selectors/cardSelector';
import i18n from "../../local/i18next/i18n"
import { IError, setError } from './administrativSlice';


export interface ICard {
  cardsList: ICardItem[] | undefined,
  userCard: ICardItem | undefined,
  content: any | undefined
  contentList: ContentData[] | undefined
  vCardList: any | undefined
}

const initialState: ICard = {
  cardsList: [],
  userCard: undefined,
  content: undefined,
  contentList: [],
  vCardList: undefined
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardsList: (state, action: PayloadAction<ICardItem[] | undefined>) => {
      state.cardsList = action.payload
    },
    setUserCard: (state, action: PayloadAction<ICardItem | undefined>) => {
      state.userCard = action.payload
    },
    setUserContent: (state, action: PayloadAction<any | undefined>) => {
      state.content = action.payload
    },
    setContentList: (state, action: PayloadAction<ContentData[] | undefined>) => {
      state.contentList = action.payload
    },
    savedContactList: (state, action: PayloadAction<any | undefined>) => {
      state.vCardList = action.payload
    },
  }
})

export const getCardList = (userId?: number) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.get(`user/card/findAll?userId=${userId}`);
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
  }
};

export const getCardById = (payload: ICardId) => async (dispatch: Dispatch) => {
  const response = await mainApi.get(`user/card/cardId/${payload.cardId}`);
  try {
    if (response.data) {
      dispatch(setUserCard(response?.data))
      //@ts-ignore
      dispatch(getContentById({ id: response?.data?.id }))
    } else {
      const data: any = {
        title: i18n.t(`Errors.Error_message_title`),
        text: "Request failed, please try again",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }
  } catch (err: any) {
  }
};
export const getCardInfo = (payload: ICardId) => async (dispatch: Dispatch) => {
  const response = await mainApi.get(`user/card/${payload.cardId}`);
  try {
    if (response.data) {
      dispatch(setUserCard(response?.data))
      //@ts-ignore
      dispatch(getContentById({ id: response?.data?.id }))
    } else {
      const data: any = {
        title: i18n.t(`Errors.Error_message_title`),
        text: "Request failed, please try again",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }
  } catch (err: any) {
  }
};

export const deleteCard = (payload: ICardId) => async (dispatch: Dispatch, getState: () => RootState) => {
  try {
    const response = await mainApi.delete(`user/card/${payload.cardId}`);
    if (response) {
      const cardList = cardListSelector(getState())
      const filteredCardList = cardList?.filter(((el: ICardItem) => el.id !== payload.cardId))
      dispatch(setCardsList(filteredCardList))
    }
  } catch (err: any) {
    console.log(err);

  }
};
export const editCard = (payload: any, cb: () => void) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.put(`user/card/${payload.cardId}`, payload);
    if (response.status === 200) {
      cb()
    }
  } catch (err: any) {
    const data: IError = {
      title: i18n.t(`Errors.Error_message_title`),
      text: err?.response?.data?.message,
      buttonTitle: 'OK'
    }
    dispatch(setError(data))
  }
};

export const getContentById = (payload: IUserId) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.get(`content/byCard/${payload.id}`);
    if (response.data) {
      dispatch(setUserContent(response?.data))
    }
  } catch (err: any) {
  }
};
export const addCard = (data: IAddCard, cb: () => void) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.post(`user/card/`, data);
    if (response.data) {
      cb()
    } else {
      const data: any = {
        title: i18n.t(`Errors.Error_message_title`),
        text: "Adding failed",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }
  } catch (err: any) {
  }
};
export const getContentList = () => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.get(`admin/content/`);
    if (response?.data) {
      dispatch(setContentList(response?.data))

    } else {
      const data: any = {
        title: i18n.t(`Errors.Error_message_title`),
        text: "Content get failed",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }
  } catch (err: any) {
  }
};
export const saveContact = (id: number, cb: () => void) => async (dispatch: Dispatch) => {
  try {
    const response = await mainApi.get(`user/card/generate-contact/${id}`);
    if (response?.data) {
      dispatch(savedContactList(response?.data))
      cb()
    } else {
      const data: any = {
        title: i18n.t(`Errors.Error_message_title`),
        text: "Content get failed",
        buttonTitle: 'OK'
      }
      dispatch(setError(data))
    }
  } catch (err: any) {
  }
};




export const { setCardsList, setContentList, setUserCard, setUserContent, savedContactList } = cardSlice.actions


export default cardSlice.reducer