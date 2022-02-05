import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { ArgumentInput } from 'features/arguments/ArgumentInput';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
    Argument,
    getArguments,
    argumentsActions,
} from 'features/arguments/argumentsSlice';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
`;

const Button = styled(MuiButton)`
    margin-top: 20px;
`;

export const ArgumentInputList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const argumentList: Argument[] = useAppSelector(getArguments);

    const { addArgument, updateName, updateValue } = argumentsActions;

    return (
        <Container>
            {argumentList.map((e: Argument) => (
                <ArgumentInput
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
                onClick={() => dispatch(addArgument())}
            >
                Add +
            </Button>
        </Container>
    );
};
