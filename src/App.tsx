import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import BuilderIcon from 'assets/builder.png';
import { computeValue } from 'libs/computeValue';
import { ArgumentInputList } from 'features/arguments/ArgumentInputList';
import { OperationInputList } from 'features/operations/OperationInputList';
import { useAppSelector } from 'app/hooks';
import { Argument, getArguments } from 'features/arguments/argumentsSlice';
import {
    getOperations,
    OperationEntry,
} from 'features/operations/operationsSlice';
import { useEffect, useState } from 'react';

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
    margin-bottom: 100px;
`;

const Inputs = styled('div')`
    display: flex;
    min-width: 100vw;
    flex-direction: row;
    justify-content: space-around;
`;

const Result = styled('div')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
}));

const Error = styled('div')(({ theme }) => ({
    color: theme.palette.primary.dark,
}));

const App = (): JSX.Element => {
    const [error, setError] = useState<boolean | null>(null);

    const [value, setValue] = useState<boolean | null>(null);

    const args: Argument[] = useAppSelector(getArguments);

    const operations: OperationEntry[] = useAppSelector(getOperations);

    useEffect(() => {
        try {
            setError(false);
            // The 1st el in the state tree is the one without operatorId key
            const topLevel: OperationEntry | undefined = operations.find(
                (e) => !e.operatorId
            );
            setValue(
                topLevel ? computeValue(topLevel, operations, args) : null
            );
        } catch (e) {
            setError(true);
        }
    }, [args, operations]);

    return (
        <Container>
            <Tooltip
                arrow
                title={"I'm the logical operation builder"}
                placement='top'
            >
                <Builder
                    src={BuilderIcon}
                    alt='Operation builder'
                    width='40px'
                />
            </Tooltip>
            <Inputs>
                <ArgumentInputList />
                <OperationInputList />
            </Inputs>
            {error && <Error>{error}</Error>}
            {!error && value !== null && <Result>{value?.toString()}</Result>}
        </Container>
    );
};

export default App;
