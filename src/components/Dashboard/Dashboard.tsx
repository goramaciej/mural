import { ReactElement, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Box, Button } from '@mui/material';

import { DashboardBox, DataBox, HistoryBox } from './Dashboard.styles';

import SendEth from './SendEth';

export const Dashboard = (): ReactElement => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    const [globalError, setGlobalError] = useState<string | null>(null);

    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);

    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [userHistory, setUserHistory] = useState<
        ethers.providers.TransactionResponse[]
    >([]);

    const fetchData = useCallback(async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);

            setUserLoggedIn(true);

            const signer = provider.getSigner();
            setSigner(signer);
            const userAddress = await signer.getAddress();
            setUserAddress(userAddress);

            const userBalance = await signer.getBalance();
            setUserBalance(formatEther(userBalance));

            let newProvider = new ethers.providers.EtherscanProvider('ropsten');
            let history = await newProvider.getHistory(userAddress);
            console.log(history);
            setUserHistory(history);

            // const wallet = await ethers.Wallet.createRandom();
            // console.log('address:', wallet.address);
            // console.log('mnemonic:', wallet.mnemonic.phrase);
            // console.log('privateKey:', wallet.privateKey);
        } catch (err) {
            setGlobalError("No metamask extension found, please install it.")
        }
    }, []);

    return (
        <DashboardBox>
            <h1>Dashboard</h1>

            {userLoggedIn ? (
                <>
                    <Box>
                        <DataBox>
                            Address: <span>{userAddress}</span>
                        </DataBox>
                        <DataBox>
                            Balance: <span>{userBalance} ETH</span>
                        </DataBox>
                    </Box>

                    <HistoryBox>
                        {userHistory.length < 1
                            ? 'No transactions in history'
                            : userHistory.map(
                                  (
                                      item: ethers.providers.TransactionResponse
                                  ) => {
                                      return (
                                          <div>
                                              <a
                                                  href={`https://rinkeby.etherscan.io/tx/${item.hash}}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                              >
                                                  {item.hash}
                                              </a>
                                          </div>
                                      );
                                  }
                              )}
                    </HistoryBox>

                    <SendEth />
                </>
            ) : (
                <Button
                    onClick={() => fetchData()}
                    color="info"
                    variant="contained"
                >
                    Login to metamask
                </Button>
            )}
            { globalError && globalError.length > 0 && (
                <div style={{color: '#e60000', fontWeight: '600', marginTop: '10px', fontSize: '16px'}}>{globalError}</div>
            )}
            
        </DashboardBox>
    );
};
