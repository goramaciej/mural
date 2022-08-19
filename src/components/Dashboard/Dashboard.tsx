import { ReactElement, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import { Box, Button } from '@mui/material';

import { DashboardBox, DataBox, HistoryBox } from './Dashboard.styles';

export function Dashboard(): ReactElement {
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [userHistory, setUserHistory] = useState<ethers.providers.TransactionResponse[]>([]);

    const fetchData = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);

        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setUserAddress(userAddress);

        const userBalance = await signer.getBalance();
        setUserBalance(formatEther(userBalance));

        let newProvider = new ethers.providers.EtherscanProvider('ropsten');
        let history = await newProvider.getHistory(userAddress);
        setUserHistory(history);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DashboardBox>
            <h1>Dashboard</h1>
            <Box>
                <DataBox>
                    Address: <span>{userAddress}</span>
                </DataBox>
                <DataBox>
                    Balance: <span>{userBalance} ETH</span>
                </DataBox>
            </Box>

            <HistoryBox>
                { userHistory.length < 1 && (
                    'No transactions in history'
                )}
            </HistoryBox>

            <Button
                onClick={() => console.log('clic')}
                color='info'
                variant="contained"
            >
                Kaszka
            </Button>
        </DashboardBox>
    );
}
