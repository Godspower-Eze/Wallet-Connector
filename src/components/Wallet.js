import React, { useState } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Authereum from "authereum";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import ethProvider from "eth-provider";
import Portis from '@portis/web3';

const providerOptions = {
    authereum: {
      package: Authereum // required
    },
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            4: "https://rinkeby.infura.io/v3/383b25ac0c524405b7e8be6c19bd4bcd",
            97: "https://speedy-nodes-nyc.moralis.io/b480fa8c5228046e20cec984/bsc/testnet/archive",
          }
        }
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: "pk_test_951A2D828F040D2A" // required
      }
    },
    torus: {
      package: Torus, // required
    },
    portis: {
      package: Portis, // required
      options: {
        id: "PORTIS_ID" // required
      }
    },
    frame: {
      package: ethProvider // required
    }
  };
  
const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
});

web3Modal.clearCachedProvider()

const Wallet = () => {

  let [connect, setConnection] = useState(false)
  let [account, setAccount] = useState("")



    let getWeb3 = async () => {
        let provider = await web3Modal.connect();
        // provider.on("disconnect", (info) => {
        //   console.log(info);
        // });
        let web3 = new Web3(provider);
        return web3
    }

    // // Subscribe to chainId change
    // provider.on("chainChanged", (chainId) => {
    //   console.log(chainId);
    // });

    // // Subscribe to provider connection
    // provider.on("connect", (info: { chainId: number }) => {
    //   console.log(info);
    // });

    // // Subscribe to provider disconnection
    // provider.on("disconnect", (error: { code: number; message: string }) => {
    //   console.log(error);
    // });

    return(
    <div className="App">
        {connect ?<span>Connected with: {account}</span> : <button onClick={getWeb3}>Connect</button> }
    </div>
    )
}

export default Wallet;