import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'



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

  }
})

export const getCardList = () => async (dispatch: Dispatch) => {
  try {
    const response = { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] }
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
  }
};

export const { setCardsList } = cardSlice.actions


export default cardSlice.reducer