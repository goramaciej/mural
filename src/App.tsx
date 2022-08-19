import { ReactElement, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from 'theme/defaultTheme';

import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';

// import WalletElement from 'components/WalletElement/WalletElement';
import { Dashboard } from 'components/Dashboard';

function App(): ReactElement {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <SafeProvider>
                <Dashboard />
            </SafeProvider>
        </ThemeProvider>
    );
}

export default App;
