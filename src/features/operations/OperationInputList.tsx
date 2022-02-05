import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { OperationInput } from 'features/operations/OperationInput';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    Operation,
    getOperations,
    operationsActions,
} from 'features/operations/operationsSlice';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
`;

const Button = styled(MuiButton)`
    width: 100px;
    margin-top: 20px;
`;

export const OperationInputList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const operationList: Operation[] = useAppSelector(getOperations);

    const { addOperation, updateName, updateValue } = operationsActions;

    return (
        <Container>
            {operationList.map((e: Operation) => (
                <OperationInput
                    key={e.id}
                    value={e.value}
                    name={e.name}
                    onValueChange={(v: boolean) =>
                        dispatch(updateValue({ id: e.id, value: v }))
                    }
                    onNameChange={(n: string) =>
                        dispatch(updateName({ id: e.id, value: n }))
                    }
                />
            ))}
            <Button
                disableElevation
                variant='contained'
                onClick={() => dispatch(addOperation())}
            >
                Add +
            </Button>
        </Container>
    );
};
