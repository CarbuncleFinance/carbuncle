import { decodeAccountID } from 'xrpl'

// XRPLアドレスを32バイトの16進数に変換
export const xrplAddressToEvmAddress = (address: `r${string}`): string => {
  const accountIDBytes = decodeAccountID(address)
  const newAddress = `0x${[...accountIDBytes].map((x) => x.toString(16).padStart(2, '0')).join('')}`

  return newAddress
}
