import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import {
    Argument,
    getArguments,
    argumentsActions,
} from 'features/arguments/argumentsSlice';
import { ArgumentInput } from 'features/arguments/ArgumentInput';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
`;

const InputContainer = styled('div')`
    margin-bottom: 15px;
`;

const Button = styled(MuiButton)`
    width: 100px;
    margin-top: 20px;
`;

export const ArgumentInputList = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const argumentList: Argument[] = useAppSelector(getArguments);

    const { add, updateName, updateValue } = argumentsActions;

    return (
        <Container>
            {argumentList.map((e: Argument) => (
                <InputContainer key={e.id}>
                    <ArgumentInput
                        value={e.value}
                        name={e.name}
                        onValueChange={(v: boolean): void => {
                            dispatch(updateValue({ id: e.id, value: v }));
                        }}
                        onNameChange={(n: string): void => {
                            dispatch(updateName({ id: e.id, value: n }));
                        }}
                    />
                </InputContainer>
            ))}
            <Button variant='contained' onClick={() => dispatch(add())}>
                Add +
            </Button>
        </Container>
    );
};
