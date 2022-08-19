import { ReactElement, memo } from 'react';
import { FormControlProps, FormControl } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, InputAdornment } from '@mui/material';

import { SendEthForm, StyledTextField } from './Dashboard.styles';

interface IFormInput {
    address: string;
    amount: string;
}

const schema = yup.object({
    address: yup.string().required(),
    amount: yup.string().required(),
});

const SendEth = (): ReactElement => {
    const {
        control,
        handleSubmit,
        formState: { errors, touchedFields, isValid },
    } = useForm<IFormInput>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
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
                                <InputAdornment position="end"
                                
                                >
                                    ETH
                                </InputAdornment>
                            ),
                        }}
                        {...field}
                    />
                )}
            />
            <Button
                color="info"
                variant="contained"
                type="submit"
                disabled={!isValid}
            >
                Make transaction
            </Button>
        </SendEthForm>
    );
};

export default memo(SendEth);
