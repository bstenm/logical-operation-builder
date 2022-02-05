import MuiSelect from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

const Container = styled('div')`
    display: flex;
    margin-top: 20px;
`;

const Select = styled('div')`
    width: 90px;
`;

type Props = {
    name: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    onNameChange: (name: string) => void;
};

export const ArgumentInput = ({
    name,
    value,
    onValueChange,
    onNameChange,
}: Props): JSX.Element => {
    const onSelect = (e: SelectChangeEvent<boolean>): void => {
        onValueChange(e.target.value === 'true');
    };

    const onInput = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ): void => {
        onNameChange(e.target.value);
    };

    return (
        <Container>
            <TextField
                size='small'
                label='Argument'
                value={name}
                variant='outlined'
                onChange={onInput}
            />
            <Select>
                <MuiSelect size='small' value={value} onChange={onSelect}>
                    <MenuItem value='false'>false</MenuItem>
                    <MenuItem value='true'>true</MenuItem>
                </MuiSelect>
            </Select>
        </Container>
    );
};
