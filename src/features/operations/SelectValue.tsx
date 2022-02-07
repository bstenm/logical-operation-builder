import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import MuiFormControl from '@mui/material/FormControl';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    label: string;
    options: string[];
    onSelect(value: string): void;
    onCancel(): void;
    defaultValue: string;
};

const Box = styled(MuiBox)`
    display: flex;
    width: 140px;
`;

const FormControl = styled(MuiFormControl)`
    width: 120px;
`;

const CancelIcon = styled(CancelOutlinedIcon)`
    margin: 7px 0 0 10px;
`;

export const SelectValue = ({
    label,
    options,
    onSelect,
    onCancel,
    defaultValue,
}: Props): JSX.Element => {
    const handleChange = (e: SelectChangeEvent<string>): void => {
        onSelect(e.target.value);
    };

    return (
        <Box>
            <FormControl fullWidth size='small'>
                <InputLabel id='select-label'>{label}</InputLabel>
                <Select
                    label={label}
                    onChange={handleChange}
                    defaultValue={defaultValue}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CancelIcon onClick={onCancel} />
        </Box>
    );
};
