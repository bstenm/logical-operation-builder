import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { getOperatorChildrenEntryIds } from 'libs/getOperatorChildrenEntryIds';

export type ValueTypeOption = 'constant' | 'argument';

export type OperatorTypeOption = 'operator';

export type OperatorValueOption = 'and' | 'or';

export type OperationTypeOption = OperatorTypeOption | ValueTypeOption;

export type Operator = {
    id: string;
    type: OperatorTypeOption;
    value: OperatorValueOption;
    operatorId?: string;
};

export type Value = Omit<Operator, 'type' | 'value'> & {
    type: ValueTypeOption;
    value: string;
};

export type OperationEntry = Operator | Value;

type UpdateOperationPayload = {
    payload: {
        id: string;
        value: string;
    };
};

type AddValuePayload = {
    payload: Value;
    operatorId?: string;
};

type AddOperatorPayload = {
    payload: Operator;
    operatorId?: string;
};

type RemoveEntryPayload = {
    payload: string;
};

const initialState: OperationEntry[] = [];

export const operationsSlice = createSlice({
    name: 'operations',
    initialState,
    reducers: {
        updateValue(
            state: OperationEntry[],
            { payload: { id, value } }: UpdateOperationPayload
        ) {
            const index = state.findIndex((e) => e.id === id);
            // Using ImmerJs under the hood
            state[index].value = value;
        },
        addValue(state: OperationEntry[], { payload }: AddValuePayload) {
            // Using ImmerJs under the hood
            state.push(payload);
        },
        addOperator(state: OperationEntry[], { payload }: AddOperatorPayload) {
            // Using ImmerJs under the hood
            state.push(payload);
        },
        remove(state: OperationEntry[], { payload }: RemoveEntryPayload) {
            const idsToRemove = getOperatorChildrenEntryIds(payload, state, []);
            // Using ImmerJs under the hood
            return state.filter((e) => !idsToRemove.includes(e.id));
        },
    },
});

export const operationsActions = operationsSlice.actions;

export const operationsReducer = operationsSlice.reducer;

export const getOperations = (state: RootState): OperationEntry[] =>
    state.operations;
