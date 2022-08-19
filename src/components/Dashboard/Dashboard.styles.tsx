import { styled } from '@mui/material/styles';
import { Box, Container, TextField } from '@mui/material';


export const DashboardBox = styled(Box)`
    && {
        display: flex;
        width: 100%;
        max-width: 700px;
        flex-grow: 1;
        flex-direction: column;
        background: linear-gradient(
            to right bottom,
            rgb(0, 116, 231),
            rgb(0, 49, 98) 120%
        );
        padding: 10px 40px 30px;
        border-radius: 15px;        
    }
`;

export const DataBox = styled(Box)`
    margin-top: 15px;
    font-weight: 600;
    word-break: break-all;
    > span {
        font-weight: 400;
        color: rgb(0, 200, 255);
    }
`;

export const HistoryBox = styled(Box)`
    border: 1px solid white;
    border-radius: 10px;
    margin: 20px 0;
    padding: 10px;
`;


export const SendEthForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
    >h3 {
        margin-bottom: 0;
    }
`

export const StyledTextField = styled(TextField)`
    && {
        /* background-color: blue; */
        >.MuiInputBase-root {
           
        }
    }
`;