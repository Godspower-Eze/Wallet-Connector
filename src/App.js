import logo from './logo.svg';
import './App.css';
import Wallet from './components/Wallet';

function App() {

  // const connect = async (remoteClient) => {
  //   try {
  //       if (remoteClient = 1){
  //           if (window.ethereum){
  //               await window.ethereum.send('eth_requestAccounts');
  //               window.web3 = new Web3(window.ethereum);
  //               let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  //               setAccount(accounts[0])
  //               setConnected(() => true)
  //           }else{
  //             return alert("Please Install Metamask");
  //           }
  //       }
  //   }catch(err){
  //       console.error(err)
  //   }
  
  // }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Wallet />
      </header>
    </div>
  );
}

export default App;
