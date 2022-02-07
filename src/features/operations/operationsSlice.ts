import { v4 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

export const operationTypes = ['constant', 'argument', 'and', 'or'] as const;

export type OperationType = typeof operationTypes[number];

export type Operation = {
    id: string;
    type: string;
    value: string;
};

type UpdateOperationPayload = {
    payload: {
        id: number;
        value: string;
    };
};

type AddOperationPayload = {
    payload: {
        type: OperationType;
        value: string;
    };
};

const initialState: Operation[] = [];

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        update(
            state: Operation[],
            { payload: { id, value } }: UpdateOperationPayload
        ) {
            // const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            // state[index].value = value;
        },
        add(
            state: Operation[],
            { payload: { type, value } }: AddOperationPayload
        ) {
            const id = uuid();
            // Using ImmerJs under the hood
            state.push({ id, type, value });
        },
    },
});

export const operationsActions = operationsSlice.actions;

export const operationsReducer = operationsSlice.reducer;
