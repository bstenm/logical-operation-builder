import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';

const Container = styled('div')`
    margin-top: 20px;
`;

type Props = {
    value: string;
    onValueChange: (value: string) => void;
};

export const OperationSelect = ({
    value = 'select...',
    onValueChange,
}: Props): JSX.Element => {
    const onSelect = (e: SelectChangeEvent<string>): void => {
        onValueChange(e.target.value);
    };

    return (
        <Container>
            <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={value}
                onChange={onSelect}
            >
                <MenuItem value='constant'>constant</MenuItem>
                <MenuItem value='argument'>argument</MenuItem>
                <MenuItem value='and'>and</MenuItem>
                <MenuItem value='or'>or</MenuItem>
            </Select>
        </Container>
    );
};
