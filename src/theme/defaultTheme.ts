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
                h3: {
                    marginTop: 35,
                    marginBottom: 0,
                    borderTop: '1px solid #ffffff69',
                    paddingTop: 15,
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
                    margin: '20px 0',
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
                        color: 'rgb(0, 200, 255)',
                        fontWeight: '600',
                    },
                },
            },
        },
    },
});
