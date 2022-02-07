import maxBy from 'lodash/maxBy';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export type Argument = {
    id: number;
    name: string;
    value: boolean;
};

type Payload = {
    payload: {
        id: number;
        value: string | boolean;
    };
};

const initialValues: Omit<Argument, 'id'> = {
    value: false,
    name: 'New Arg',
};

const initialState: Argument[] = [{ ...initialValues, id: 1 }];

export const argumentsSlice = createSlice({
    name: 'arguments',
    initialState,
    reducers: {
        updateName(state: Argument[], { payload: { id, value } }: Payload) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].name = value as string;
        },
        updateValue(state: Argument[], { payload: { id, value } }: Payload) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].value = value as boolean;
        },
        add(state: Argument[]) {
            const entry = maxBy(state, (e: Argument) => e.id);
            // Using ImmerJs under the hood
            state.push({ ...initialValues, id: (entry?.id ?? 0) + 1 });
        },
    },
});

export const argumentsActions = argumentsSlice.actions;

export const argumentsReducer = argumentsSlice.reducer;

export const getArguments = (state: RootState): Argument[] => state.arguments;
