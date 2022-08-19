import { ReactElement, useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Box, Button } from '@mui/material';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

import { DashboardBox, DataBox, HistoryBox, ErrorMsg, SuccessMsg } from './Dashboard.styles';

import SendEth from './SendEth';

import { IPayRequest } from './SendEth';

export const Dashboard = (): ReactElement => {
    // STATE
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    const [globalError, setGlobalError] = useState<string | null>();
    const [globalSuccess, setGlobalSuccess] = useState<string | null>();

    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
        null
    );

    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userBalance, setUserBalance] = useState<string | null>(null);
    const [userHistory, setUserHistory] = useState<
        ethers.providers.TransactionResponse[]
    >([]);

    // CALLBACKS
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
        } catch (err) {
            setGlobalError('No metamask extension found, please install it.');
        }
    }, []);

    const sendPayRequest = useCallback(
        async (obj: IPayRequest) => {
            setGlobalError(null);
            setGlobalSuccess(null);
            if (Number(obj.amount) > Number(userBalance)) {
                return setGlobalError(
                    `The ammount is bigger than your balance, please pass amount smaller than ${userBalance}`
                );
            }
            if (signer) {
                try {
                    const tx = await signer.sendTransaction({
                        to: obj.address,
                        value: parseEther(obj.amount),
                    });
                    setGlobalSuccess(
                        'Please confirm operation in metamask browser extension.'
                    );
                } catch (err: any) {
                    if (err.code === 'INVALID_ARGUMENT') {
                        return setGlobalError(
                            'Invalid address, please enter valid address'
                        );
                    }

                    setGlobalError(
                        'Something went wrong, please try again later'
                    );
                }
            }
        },
        [userBalance, signer]
    );

    // HOOKS
    const { sdk, connected, safe } = useSafeAppsSDK();

    useEffect(() => {
        console.log('all: ', sdk);
        console.log('connected: ', connected);
        console.log('safe: ', safe);
    }, [sdk]);

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

                    <h3>Transaction history:</h3>
                    <HistoryBox>
                        {userHistory.length < 1
                            ? 'No transactions in history yet'
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

                    <SendEth sendPayRequest={sendPayRequest} />
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
            {globalError && globalError.length > 0 && (
                <ErrorMsg>
                    {globalError}
                </ErrorMsg>
            )}
            {globalSuccess && globalSuccess.length > 0 && (
                <SuccessMsg>{globalSuccess}</SuccessMsg>
            )}
        </DashboardBox>
    );
};
