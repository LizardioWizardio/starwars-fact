import { configureStore } from '@reduxjs/toolkit';
import factsReducer from './factsSlice';

export const store = configureStore({
    reducer: {
        facts: factsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;