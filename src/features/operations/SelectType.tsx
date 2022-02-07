import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import capitalize from 'lodash/capitalize';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiFormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    OperationType,
    operationTypes,
} from 'features/operations/operationsSlice';

const Box = styled(MuiBox)`
    width: 140px;
`;

const FormControl = styled(MuiFormControl)`
    width: 120px;
`;

type Props = {
    label?: string;
    selected: string;
    onSelect: (value: string) => void;
};

export const SelectType = ({
    label,
    selected,
    onSelect,
}: Props): JSX.Element => {
    const handleChange = (e: SelectChangeEvent<string>): void => {
        onSelect(e.target.value);
    };

    return (
        <Box>
            <FormControl size='small'>
                {label && <InputLabel id='select-label'>{label}</InputLabel>}
                <Select
                    label={label}
                    value={selected}
                    labelId='select-label'
                    onChange={handleChange}
                >
                    {operationTypes.map((option: OperationType) => (
                        <MenuItem key={option} value={option}>
                            {capitalize(option)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
