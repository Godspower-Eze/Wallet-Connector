import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

const Web3 = require('web3')

function App() {

  let [connected, setConnected] = useState(false);
  let [account, setAccount] = useState("Ox")

  useEffect(() => {
    let run = async () => {
      checkConnection();
    }
    run();
  },[connected])

  const checkConnection = async () => {
    if(window.ethereum){
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0){
        setConnected(true)
        setAccount(accounts[0])
      }
    }
  }

  const connect = async (remoteClient) => {
    try {
        if (remoteClient = 1){
            if (window.ethereum){
                await window.ethereum.send('eth_requestAccounts');
                window.web3 = new Web3(window.ethereum);
                let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0])
                setConnected(() => true)
            }else{
              return alert("Please Install Metamask");
            }
        }
    }catch(err){
        console.error(err)
    }
  
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {connected ? <span>Connected with <b>{account}</b></span> :<button onClick={() => connect(1)}>Connect to Metamask</button>}
        {connected ? <button onClick={() => connect(1)}>Disconnect</button> : <span></span>}
      </header>
    </div>
  );
}

export default App;
