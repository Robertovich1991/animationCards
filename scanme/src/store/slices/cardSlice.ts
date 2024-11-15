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
    const response = {
      data: [
        {profession: 'Photographer', name: 'Alice Johnson', date: '08/15', url: 'https://s0.rbk.ru/v6_top_pics/resized/200xH/media/img/5/81/756475028356815.jpg' },
        {profession: 'Writer', name: 'Michael Brown', date: '07/04', url: 'https://www.ixbt.com/img/n1/news/2024/10/4/ixbtmedia_elon_musk_-_head_of_department_of_government_effici_110519e3-41b0-43ce-86a3-aadc930f4f75_1_large.png' },
        { profession: 'Chef' ,name: 'Samantha Lee', date: '03/12', url: 'https://resizing.flixster.com/T0SE3g5Tl6w4qlpHvoM8xpePpqU=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1570_v9_bc.jpg' },
        { profession: 'Engineer', name: 'David Clark', date: '12/31', url: 'https://media.architecturaldigest.com/photos/637949b3407644b8cdc8947f/16:9/w_1920,c_limit/1442809583' },
        { name: 'Rachel Green', date: '11/19', url: 'https://m.media-amazon.com/images/S/pv-target-images/f8ac9c1e8c1e9ca2bb1db8d0fced4082321ae97b7aa07402b7c6c44ea33d4411._SX300_.jpg' },
        { name: 'James Miller', date: '02/28', url: 'https://m.media-amazon.com/images/S/pv-target-images/f8ac9c1e8c1e9ca2bb1db8d0fced4082321ae97b7aa07402b7c6c44ea33d4411._SX300_.jpg' },
        { name: 'Sophia Davis', date: '06/09', url: 'https://resizing.flixster.com/T0SE3g5Tl6w4qlpHvoM8xpePpqU=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/1570_v9_bc.jpg' },
        { name: 'Chris Wilson', date: '01/23', url: 'https://m.media-amazon.com/images/S/pv-target-images/f8ac9c1e8c1e9ca2bb1db8d0fced4082321ae97b7aa07402b7c6c44ea33d4411._SX300_.jpg' },
        { name: 'Emma Thomas', date: '10/05', url: 'https://m.media-amazon.com/images/S/pv-target-images/f8ac9c1e8c1e9ca2bb1db8d0fced4082321ae97b7aa07402b7c6c44ea33d4411._SX300_.jpg' },
        { name: 'Olivia Martinez', date: '05/22', url: 'https://detfond.com/wp-content/uploads/2020/06/xdzheff-bezos.jpg.pagespeed.ic.dHTow9RIYm.webp' }
      ]
    }
    if (response.data) {
      dispatch(setCardsList(response?.data))
    }
  } catch (err: any) {
  }
};

export const { setCardsList } = cardSlice.actions


export default cardSlice.reducer