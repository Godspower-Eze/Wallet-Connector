import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, authereum, walletlink, portis } from "../connectors";
import { getChainName } from '../utils';

const Wallet = () => {
    let [loading, setLoading] = useState(false)
    const {
        account,
        activate,
        active,
        chainId,
        connector,
        deactivate,
        error,
        provider,
        setError,
    } = useWeb3React();
    
    async function connectWithMetaMask() {
      try {
        await activate(injected)
        console.log(error)
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithWalletConnect() {
      try {
        await activate(walletconnect)
        console.log(error)
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithPortis() {
      try {
        await activate(portis)
        console.log(error)
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithWalletLink() {
      try {
        await activate(walletlink)
        console.log(error)
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithAuthereum() {
      try {
        await activate(authereum)
        console.log(error)
      } catch (ex) {
        console.log(ex)
      }
    }

    const disconnect = async () => {
      deactivate()
    }

    return(
    <div className="App">
      {active
      ?
      <div>
      <p>Connected with {account}</p>
      <p>Chain: {getChainName(chainId)}</p>
      <button onClick={disconnect}>Disconnect</button>
      </div>
      :
      <div>
      <button onClick={connectWithMetaMask}>Connect Using Metamask</button>
      <button onClick={connectWithWalletConnect}>Connect Using WalletConnect</button>
      <button onClick={connectWithAuthereum}>Connect Using Authereum</button>
      <button onClick={connectWithWalletLink}>Connect Using WalletLink</button>
      <button onClick={connectWithPortis}>Connect Using Portis</button>
      </div>
       }
    </div>
    )
}

export default Wallet;