import { ReactElement } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from 'theme/defaultTheme';

// import WalletElement from 'components/WalletElement/WalletElement';
import { Dashboard } from 'components/Dashboard';

function App(): ReactElement {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Dashboard />
        </ThemeProvider>
    );
}

export default App;
