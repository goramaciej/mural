import { ReactElement } from 'react';
// import { ethers } from "ethers";

// import type { MetaMaskInpageProvider } from "@metamask/providers";

// export const useMetaMask = () => {
//     const ethereum = global?.window?.ethereum;
//     if (!ethereum || !ethereum.isMetaMask) return;
//     return ethereum as unknown as MetaMaskInpageProvider;
//   };

export default function WalletElement(): ReactElement {
    // const onConnect = useCallback( () => {

    // }, []);

    // const connectToMetamask =  async () => {
    //     const provider = new ethers.providers.Web3Provider(window.ethereum)
    //     const accounts = await provider.send("eth_requestAccounts", []);
    //     // this.setState({ selectedAddress: accounts[0] })
    //   }

    return <div>WalletElement</div>;
}
