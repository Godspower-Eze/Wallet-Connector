export const getChainName = (chainId) => {
    let chains = {
      1:"Ethereum Mainnet",
      56: "Binance Smart Chain Mainnet",
      97: "Binance Smart Chain Testnet",
      3: "Ethereum Testnet Ropsten",
      4: "Ethereum Testnet Rinkeby",
      5: "Ethereum Testnet Görli",
      42: "Ethereum Testnet Kovan"
    }
    return chains[chainId]
  }