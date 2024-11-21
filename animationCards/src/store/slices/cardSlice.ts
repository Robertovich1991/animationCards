import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import fdata from './fakeCardData'
export interface ICard {
  cardsList?: number[],
}

const initialState: ICard = {
  cardsList: [],
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardsList: (state, action: PayloadAction<number[] | undefined>) => {
      state.cardsList = action.payload
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.cardsList = state.cardsList?.filter(i => i.id !== index).map((_, index, list) => {
        if (index === 0) {
          return list[list.length - 1]
        }
        return list[index - 1]
      }
      )
    },

  }
})

export const getCardList = () => async (dispatch: Dispatch) => {
  try {
    const response = {
      data: fdata
    }
    
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
  }
};

export const { setCardsList, removeItem } = cardSlice.actions


export default cardSlice.reducer