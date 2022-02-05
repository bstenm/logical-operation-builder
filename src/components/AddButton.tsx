import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Button = styled(MuiButton)`
    width: 100px;
    margin-top: 20px;
`;

type Props = {
    onClick: () => void;
};

export const AddButton = ({ onClick }: Props): JSX.Element => (
    <Button disableElevation variant='contained' onClick={onClick}>
        Add +
    </Button>
);
