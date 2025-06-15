import { TokenAsset } from '@/types'

export const APP_NAME = 'SkrrtVault'
export const APP_SHORT_NAME = 'SkrrtVault'
export const APP_DESCRIPTION = 'SkrrtVault'

export const SKRRT_ROUTER_CONTRACT = {
  address: '0x6b6961C65cc34De9e72Cc4FFC91514037E5ae14b'
}

export const LENDING_POOL_CONTRACT = {
  address: '0xa55EC9E93137069245BE493521f747a914636bE5'
}

export const SQUID_ROUTER_CONTRACT = {
  address: '0x9bEb991eDdF92528E6342Ec5f7B0846C24cbaB58'
}

export const AXELAR_GATEWAY_WALLET = {
  address: 'rNrjh1KGZk2jBR3wPfAQnoidtFFYQKbQn2'
}

/** XRPL EVM ITCHAIN CONTRACT */
export const ITC_CONTRACT = {
  address: '0x3b1ca8B18698409fF95e29c506ad7014980F0193'
}

export const BRDGE_GAS_FEE_AMOUT_XRP = '2'

export const AXELAR_SCAN_URL = 'https://testnet.axelarscan.io'
export const XRPL_SCAN_URL = 'https://testnet.xrpl.org'

export const CBX_CONTRACT = {
  address: '0x3d5f6b69bB3F8D6d44Eb4d3F3B6102C312Acc640'
}

export const XCB_CURRENCY = 'XCB'
export const XCB_ISSUER = 'rN72avu22PqxSCRSzP4BRRHUCNodoeCnD5'

export const LIST_ASSETS: TokenAsset[] = [
  {
    name: 'XRP',
    symbol: 'XRP',
    icon: '/icons/XRP.png',
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    name: 'Ripple USD',
    symbol: 'RLUSD',
    icon: '/icons/RLUSD.png',
    address: '0x0000000000000000000000000000000000000000'
  },
  {
    name: 'Skrrr',
    symbol: 'XCB',
    icon: '',
    address: '0x0000000000000000000000000000000000000000'
  }
]
