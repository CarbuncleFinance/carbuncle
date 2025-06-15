import { keccak256, AbiCoder, toUtf8Bytes } from 'ethers'
import { padAddressTo32Bytes, stringToHex } from '@/utils/string'
import { xrplAddressToEvmAddress } from '@/utils/address'

export enum RequestTypes {
  ADD_GAS = 'add_gas',
  ADD_RESERVES = 'add_reserves',
  CALL_CONTRACT = 'call_contract',
  INTERCHAIN_TRANSFER = 'interchain_transfer'
}

export type RequestType = (typeof RequestTypes)[keyof typeof RequestTypes]

export enum DestinationChains {
  XRPL = 'xrpl',
  XRPL_EVM = 'xrpl-evm'
}

export type DestinationChain =
  (typeof DestinationChains)[keyof typeof DestinationChains]

export const BRIDGE_CONSTANTS = {
  HASH_LENGTH: 32
} as const

export const createRequestType = (type: RequestType) => {
  return {
    memo: {
      memoType: stringToHex('type'),
      memoData: stringToHex(type)
    }
  }
}

export const createDestinationAddress = (address: string) => {
  return {
    memo: {
      memoType: stringToHex('destination_address'),
      memoData: stringToHex(address.slice(2))
    }
  }
}

export const createDestinationChain = (chain: DestinationChain) => {
  return {
    memo: {
      memoType: stringToHex('destination_chain'),
      memoData: stringToHex(chain)
    }
  }
}

export const createGasFeeAmount = (amount: string) => {
  return {
    memo: {
      memoType: stringToHex('gas_fee_amount'),
      memoData: stringToHex(amount)
    }
  }
}

export const createPayload4InterchainTransfer = (
  address: string,
  message: string = 'hello_world'
) => {
  const paddedAddress = padAddressTo32Bytes(
    xrplAddressToEvmAddress(address as `r${string}`),
    BRIDGE_CONSTANTS.HASH_LENGTH
  )

  const messageBytes = toUtf8Bytes(message)
  const hash = keccak256(messageBytes)

  return {
    memo: {
      memoType: stringToHex('payload'),
      memoData: [
        paddedAddress.padStart(64, '0').toUpperCase(),
        hash.slice(2).padStart(64, '0').toUpperCase()
      ].join('')
    }
  }
}

export const createPayload4CallContract = ({
  types,
  data
}: { types: string[]; data: string[] }) => {
  return {
    memo: {
      memoType: stringToHex('payload'),
      memoData:
        '00000000' +
        AbiCoder.defaultAbiCoder().encode(types, data).slice(2).toLowerCase()
    }
  }
}
