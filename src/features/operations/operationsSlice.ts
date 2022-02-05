import maxBy from 'lodash/maxBy';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from 'app/store';

export type Operation = {
    id: number;
    value: string;
};

type Payload = {
    payload: {
        id: number;
        value: string;
    };
};

const initialValue: Omit<Operation, 'id'> = { value: '' };

const initialState: Operation[] = [{ ...initialValue, id: 1 }];

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        updateOperation(
            state: Operation[],
            { payload: { id, value } }: Payload
        ) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].value = value;
        },
        addOperation(state: Operation[]) {
            const entry = maxBy(state, (e: Operation) => e.id);
            // Using ImmerJs under the hood
            state.push({ ...initialValue, id: (entry?.id ?? 0) + 1 });
        },
    },
});

export const operationsActions = operationsSlice.actions;

export const operationsReducer = operationsSlice.reducer;

export const getOperations = (state: RootState): Operation[] =>
    state.operations;
