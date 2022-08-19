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
    color: rgb(0, 200, 255);
    word-break: break-all;
    > span {
        font-weight: 400;
        color: #fff;
    }
`;

export const HistoryBox = styled(Box)`
    /* border-top: 1px solid white; */
    margin: 10px 0 0;
    padding: 10px;
`;

export const SendEthForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const StyledTextField = styled(TextField)`
    && {
        /* background-color: blue; */
        > .MuiInputBase-root {
            &::before {
                border-bottom: 1px solid rgba(255, 255, 255, 0.42) !important;
            }
        }
    }
`;

export const ErrorMsg = styled(Box)`
    color: #e60000;
    font-weight: 600;
    margin-top: 10px;
    font-size: 16px;
`;
export const SuccessMsg = styled(ErrorMsg)`
    color: rgb(16, 202, 101);
`;
