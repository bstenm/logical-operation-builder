import { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { v4 as uuid } from 'uuid';

import { OperationSelect } from 'features/operations/OperationSelect';

const Container = styled('div')`
    margin: 20px;
    margin-top: 0;
`;

const Button = styled(MuiButton)`
    width: 100px;
    margin-top: 20px;
`;

const SelectContainer = styled('div')`
    margin-top: 15px;
`;

type Props = {
    operatorId: string;
};

export const OperationValuesForm = ({ operatorId }: Props): JSX.Element => {
    const [inputList, setInputList] = useState<string[]>([uuid(), uuid()]);

    const addInput = () => {
        const newList: string[] = Object.assign([], inputList);
        newList.push(uuid());
        setInputList(newList);
    };

    return (
        <Container>
            {inputList.map((e: string) => (
                <SelectContainer key={e}>
                    <OperationSelect operatorId={operatorId} />
                </SelectContainer>
            ))}
            <Button variant='contained' onClick={() => addInput()}>
                Add +
            </Button>
        </Container>
    );
};
