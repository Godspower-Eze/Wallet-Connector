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

  export const getChainInfo = (chainId) => {
    let chains = {
      97: {
        chainId: 97,
        chainName: "Smart Chain - Testnet",
        nativeCurrency: {
          name: 'Binance',
          symbol: 'BNB',
          decimals: 18
        },
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/']
      },
      56: {
        chainId: 56,
        chainName: "Smart Chain",
        nativeCurrency: {
          name: 'Binance',
          symbol: 'BNB',
          decimals: 18
        },
        blockExplorerUrls: ['https://bscscan.com'],
        rpcUrls: ['https://bsc-dataseed.binance.org/']
      }
    }
    return chains[chainId]
  }