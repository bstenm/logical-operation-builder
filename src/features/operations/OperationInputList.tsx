import { styled } from '@mui/material/styles';

import {
    Operation,
    getOperations,
    operationsActions,
} from 'features/operations/operationsSlice';
import { AddButton } from 'components/AddButton';
import { OperationSelect } from 'features/operations/OperationSelect';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
`;

export const OperationInputList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const operationList: Operation[] = useAppSelector(getOperations);

    const { addOperation, updateOperation } = operationsActions;

    return (
        <Container>
            {operationList.map((e: Operation) => (
                <OperationSelect
                    key={e.id}
                    value={e.value}
                    onValueChange={(v: string): void => {
                        dispatch(updateOperation({ id: e.id, value: v }));
                    }}
                />
            ))}
            <AddButton onClick={() => dispatch(addOperation())} />
        </Container>
    );
};
