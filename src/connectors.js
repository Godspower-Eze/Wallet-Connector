import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FrameConnector } from '@web3-react/frame-connector'
import { AuthereumConnector } from '@web3-react/authereum-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TorusConnector } from '@web3-react/torus-connector'

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 56, 97] })

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: "https://rinkeby.infura.io/v3/383b25ac0c524405b7e8be6c19bd4bcd", 97:"https://speedy-nodes-nyc.moralis.io/b480fa8c5228046e20cec984/bsc/testnet/archive" },
  qrcode: true
})

export const walletlink = new WalletLinkConnector({
  url: "https://rinkeby.infura.io/v3/383b25ac0c524405b7e8be6c19bd4bcd",
  appName: 'Rainbow Wallet',
  supportedChainIds: [1, 3, 4, 5, 42, 10, 137, 69, 420, 56, 97]
})

// export const frame = new FrameConnector({ supportedChainIds: [1, 56] })

export const authereum = new AuthereumConnector({ chainId: 56 })

// export const fortmatic = new FortmaticConnector({ apiKey: process.env.FORTMATIC_API_KEY, chainId: 4 })

export const portis = new PortisConnector({ dAppId: "b718565f-1812-463d-9b08-c4a3d5e7d105", networks: [1] })

export const torus = new TorusConnector({ chainId: 1 })

