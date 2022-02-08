import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ChangeEvent } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

const Container = styled('div')`
    display: flex;
`;

const Select = styled('div')`
    width: 90px;
`;

type Props = {
    name: string;
    onValueChange: (value: boolean) => void;
    onNameChange: (name: string) => void;
};

export const ArgumentInput = ({
    name,
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
                variant='outlined'
                onChange={onInput}
                defaultValue='My Arg'
            />
            <Select>
                <MuiSelect
                    size='small'
                    defaultValue={false}
                    onChange={onSelect}
                >
                    <MenuItem value='false'>false</MenuItem>
                    <MenuItem value='true'>true</MenuItem>
                </MuiSelect>
            </Select>
        </Container>
    );
};
