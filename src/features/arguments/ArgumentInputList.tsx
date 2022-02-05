import { styled } from '@mui/material/styles';

import {
    Argument,
    getArguments,
    argumentsActions,
} from 'features/arguments/argumentsSlice';
import { AddButton } from 'components/AddButton';
import { ArgumentInput } from 'features/arguments/ArgumentInput';
import { useAppDispatch, useAppSelector } from 'app/hooks';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
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
                    onValueChange={(v: boolean): void => {
                        dispatch(updateValue({ id: e.id, value: v }));
                    }}
                    onNameChange={(n: string): void => {
                        dispatch(updateName({ id: e.id, value: n }));
                    }}
                />
            ))}
            <AddButton onClick={() => dispatch(addArgument())} />
        </Container>
    );
};
