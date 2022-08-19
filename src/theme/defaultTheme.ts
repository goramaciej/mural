import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: '#ffffff',
                    backgroundColor: '#10234e',
                    overflowX: 'hidden',
                    padding: '20px 30px',
                    fontSize: 14,
                    '& #root': {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    },
                },
                h1: {
                    fontSize: 24,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    color: '#FFFFFF',
                    padding: '8px 40px',
                    borderRadius: '10px',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.87)',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
            },
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    '>.MuiTypography-root': {
                        color: 'white',
                        fontWeight: '600',
                    },
                },
            },
        },
    },
});
