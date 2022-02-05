import maxBy from 'lodash/maxBy';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export type Operation = {
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

const initialValues: Omit<Operation, 'id'> = {
    value: false,
    name: 'New Arg',
};

const initialState: Operation[] = [{ ...initialValues, id: 1 }];

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        updateName(state: Operation[], { payload: { id, value } }: Payload) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].name = value as string;
        },
        updateValue(state: Operation[], { payload: { id, value } }: Payload) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].value = value as boolean;
        },
        addOperation(state: Operation[]) {
            const entry = maxBy(state, (e: Operation) => e.id);
            // Using ImmerJs under the hood
            state.push({ ...initialValues, id: (entry?.id ?? 0) + 1 });
        },
    },
});

export const operationsActions = operationsSlice.actions;

export const operationsReducer = operationsSlice.reducer;

export const getOperations = (state: RootState): Operation[] =>
    state.operations;
