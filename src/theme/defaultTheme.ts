import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    color: '#ffffff',
                    backgroundColor: '#10234e',
                    display: 'flex',
                    justifyContent: 'center',
                    overflowX: 'hidden',
                    padding: '20px 30px',
                    fontSize: 14,
                },
                h1: {
                    fontSize: 24,
                }
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                    color: '#FFFFFF',
                    padding: '8px 40px',
                    borderRadius: '10px',
                }
            }
        }
    },
});
