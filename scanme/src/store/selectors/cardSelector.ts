import { RootState } from "../config/configStore";

export const cardListSelector = (state: RootState) => state.cardreducer.cardsList
export const userCardSelector = (state: RootState) => state.cardreducer.userCard
export const userContentSelector = (state: RootState) => state.cardreducer.content
export const contentListSelector = (state: RootState) => state.cardreducer.contentList
export const savedContactSelector = (state: RootState) => state.cardreducer.vCardList