import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, authereum, walletlink, portis } from "../connectors";
import { getChainInfo, getChainName } from '../utils';
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import { UnsupportedChainIdError } from '@web3-react/core';

const Wallet = () => {
    let [web3, setWeb3] = useState(null)
    let [isMetamask, setIsMetamask] = useState(false)
    let [isInjected, setIsInjected] = useState(false)
    // let [loading, setLoading] = useState(false)

    const {
      account,
      activate,
      active,
      chainId,
      deactivate,
      error,
      library,
      connector
  } = useWeb3React();

    useEffect(()=>{
      errorHandler(error)
    },[error])

    useEffect(()=>{
      if(active === true){
        setWeb3(library)
      }
    },[active])
    
    useEffect(()=>{
      if(window.ethereum.isMetaMask){
        setIsMetamask(true)
      }
    })

    useEffect(()=>{
      if(connector !== undefined){
        if(connector.constructor.name === "InjectedConnector"){
          setIsInjected(true)
        }
      }
    }, [connector])

    const errorHandler = (error) => {
      if(error !== undefined){
        if(error instanceof UserRejectedRequestErrorWalletConnect){
          console.log("User Rejected")
          window.location.reload()
        }else if(error instanceof UserRejectedRequestErrorInjected){
          console.log("User Rejected Injected")
        }else if(error instanceof UnsupportedChainIdError){
          window.alert("Unsupported Chain. Connect to a supported chain")
        }else if(error instanceof NoEthereumProviderError){
          window.alert("No Ethereum Provider found")
        }
      }
    }

    const messageSigner = async() => {
        let signature = await web3.eth.sign("Sign this message", account)
        console.log(signature)
    }

    const changeBlockchain = async (chainId) => {
      try{
        if(chainId.length !== 0){
          chainId = parseInt(chainId)
          let chainIdInHex = chainId.toString(16)
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainIdInHex}` }], // chainId must be in hexadecimal numbers
          })
        }
      }catch(error){
        try{
          if (error.code === 4902){
            let chainInfo = getChainInfo(chainId)
            let chainIdInHex = chainInfo.chainId.toString(16)
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainIdInHex}`,
                  chainName: chainInfo.chainName,
                  nativeCurrency: {
                    name: chainInfo.nativeCurrency.name,
                    symbol: chainInfo.nativeCurrency.symbol, // 2-6 characters long
                    decimals: chainInfo.nativeCurrency.decimals
                  },
                  blockExplorerUrls: chainInfo.blockExplorerUrls,
                  rpcUrls: chainInfo.rpcUrls,
                },
              ],
            })
          }
        }catch(error){
          console.error(error)
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
      <br/>
      <div>
        {isMetamask === true && isInjected === true ?
         <form>
           <p>Change Blockchain:</p>
            <select onChange={(e) => changeBlockchain(e.target.value)}>
            <option></option>
              <option value="1">Ethereum Mainnet</option>
              <option value="56">Binance Smart Chain Mainnet</option>
              <option value="97">Binance Smart Chain Testnet</option>
              <option value="3">Ethereum Testnet Ropsten</option>
              <option value="4">Ethereum Testnet Rinkeby</option>
              <option value="5">Ethereum Testnet Görli</option>
              <option value="42">Ethereum Testnet Kovan</option>
  =          </select>
          </form>:
          <span></span>
          }
      </div>
      <br/>
      <div>
        <button onClick={messageSigner}>Sign a message</button>
      </div>
      <div>
        <button onClick={disconnect}>Disconnect</button>
      </div>
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