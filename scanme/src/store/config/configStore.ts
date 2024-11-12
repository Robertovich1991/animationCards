import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice"
import cardreducer from "../slices/cardSlice"

export const store = configureStore({
    reducer: {
        cardreducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch