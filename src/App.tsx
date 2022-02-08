import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import BuilderIcon from 'assets/builder.png';
import { ArgumentInputList } from 'features/arguments/ArgumentInputList';
import { OperationInputList } from 'features/operations/OperationInputList';
import { useComputeValue } from 'libs/useComputeValue';

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

const Icon = styled('span')`
    position: relative;
    left: 10px;
    top: 5px;
`;

const Error = styled('div')(({ theme }) => ({
    color: theme.palette.primary.dark,
}));

const App = (): JSX.Element => {
    const [value, error] = useComputeValue();

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
            {!error && value !== null && (
                <Result>
                    {value?.toString()}
                    <Icon>
                        {value ? (
                            <ThumbUpOffAltIcon />
                        ) : (
                            <ThumbDownOffAltIcon />
                        )}
                    </Icon>
                </Result>
            )}
        </Container>
    );
};

export default App;
