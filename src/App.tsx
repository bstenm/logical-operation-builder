import { styled } from '@mui/material/styles';

import BuilderIcon from 'assets/builder.png';
import { ArgumentInputList } from 'features/arguments/ArgumentInputList';
import { OperationInputList } from 'features/operations/OperationInputList';

const Container = styled('div')`
    display: flex;
    font-size: calc(10px + 2vmin);
    align-items: center;
    min-height: 100vh;
    flex-direction: column;
    justify-content: start;
    background-color: #fafafa;
`;

const Builder = styled('img')`
    margin-top: 60px;
    margin-bottom: 40px;
`;

const InputList = styled('div')`
    display: flex;
    min-width: 100vw;
    flex-direction: row;
    justify-content: space-around;
`;

const App = (): JSX.Element => {
    return (
        <Container>
            <Builder src={BuilderIcon} alt='Operation builder' width='40px' />
            <InputList>
                <ArgumentInputList />
                <OperationInputList />
            </InputList>
        </Container>
    );
};

export default App;
