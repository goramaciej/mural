import { ReactElement, memo } from 'react';
// import { FormControlProps, FormControl } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, InputAdornment } from '@mui/material';

import { SendEthForm, StyledTextField } from './Dashboard.styles';

const parseValue = (value: string) =>
  value
    .replace(/^\./g, '0.')
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*)\./g, '$1');

export interface IPayRequest {
    address: string;
    amount: string;
}

const schema = yup.object({
    address: yup.string().required(),
    amount: yup.string().required(),
});

type ThisProps = {
    sendPayRequest: (obj: IPayRequest) => void;
};

const SendEth = ({ sendPayRequest }: ThisProps): ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
    } = useForm<IPayRequest>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IPayRequest> = (data) => {
        sendPayRequest(data);
    };

    return (
        <SendEthForm onSubmit={handleSubmit(onSubmit)}>
            <h3>Send ETH to address:</h3>
            <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <StyledTextField
                        variant="filled"
                        label={field.name}
                        {...field}
                    />
                )}
            />
            <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <StyledTextField
                        variant="filled"
                        label={field.name}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    ETH
                                </InputAdornment>
                            ),
                        }}
                        {...field}
                        value={parseValue(field.value)}
                    />)
                }
            />
            <Button
                color="info"
                variant="contained"
                type="submit"
                disabled={!isValid}
            >
                Send
            </Button>
        </SendEthForm>
    );
};

export default memo(SendEth);
