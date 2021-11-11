import React, { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, authereum, frame } from "../connectors";

const Wallet = () => {
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
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithWalletConnect() {
      try {
        await activate(walletconnect)
      } catch (ex) {
        console.log(ex)
      }
    }

    async function connectWithAuthereum() {
      try {
        await activate(authereum)
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
      <p>Chain ID: {chainId}</p>
      <button onClick={disconnect}>Disconnect</button>
      </div>
      :
      <div>
      <button onClick={connectWithMetaMask}>Connect Using Metamask</button>
      <button onClick={connectWithWalletConnect}>Connect Using WalletConnect</button>
      <button onClick={connectWithAuthereum}>Connect Using Authereum</button>
      </div>
       }
    </div>
    )
}

export default Wallet;