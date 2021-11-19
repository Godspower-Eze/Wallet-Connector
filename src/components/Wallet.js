import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, authereum, walletlink, portis } from "../connectors";
import { getChainName } from '../utils';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

const Wallet = () => {
    let [loading, setLoading] = useState(false)
    let [errorRenderer, setErrorRenderer] = useState(false)
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

    useEffect(()=>{
      errorHandler(error)
    },[error])

    const errorHandler = (error) => {
      if(error !== undefined){
        if(error instanceof UserRejectedRequestErrorWalletConnect){
          console.log("User Rejected")
          window.location.reload()
        }else if(error instanceof UserRejectedRequestErrorInjected){
          console.log("User Rejected Injected")
        }else if(error instanceof UnsupportedChainIdError){
          let chain = getChainName(chainId)
          window.alert("Unsupported Chain. Connect to a supported chain")
        }
      }
    }
    
    async function connectWithMetaMask() {
      try {
        await activate(injected)
      } catch (error) {
        console.log(error)
      }
    }

    async function connectWithWalletConnect() {
      try {
        await activate(walletconnect)
      } catch (error) {
        console.log(error)
      }
    }

    async function connectWithPortis() {
      try {
        await activate(portis)
      } catch (error) {
        console.log(error)
      }
    }

    async function connectWithWalletLink() {
      try {
        await activate(walletlink)
      } catch (error) {
        console.log(error)
      }
    }

    async function connectWithAuthereum() {
      try {
        await activate(authereum)
      } catch (error) {
        console.log(error)
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