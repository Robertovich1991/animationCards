import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice"
import administrativeReducer from "../slices/administrativSlice"
import profileReducer from "../slices/profileSlice"
import cardreducer from "../slices/cardSlice"

export const store = configureStore({
    reducer: {
        authReducer,
        administrativeReducer,
        profileReducer,
        cardreducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch