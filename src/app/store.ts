import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { argumentsReducer } from 'features/arguments/argumentsSlice';
import { operationsReducer } from 'features/operations/operationsSlice';

export const store = configureStore({
    reducer: {
        arguments: argumentsReducer,
        operations: operationsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
