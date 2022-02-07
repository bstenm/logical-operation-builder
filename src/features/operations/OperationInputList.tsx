import { styled } from '@mui/material/styles';

import { OperationSelect } from 'features/operations/OperationSelect';

const Container = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: start;
`;

export const OperationInputList = (): JSX.Element => {
    return (
        <Container>
            <OperationSelect />
        </Container>
    );
};
