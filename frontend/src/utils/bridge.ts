import { addressTo32, padAddressTo32Bytes, stringToHex } from '@/utils/string'
import { keccak256, toUtf8Bytes } from 'ethers'
import dayjs from 'dayjs'

export enum BridgeTypes {
  ADD_GAS = 'add_gas',
  ADD_RESERVES = 'add_reserves',
  CALL_CONTRACT = 'call_contract',
  INTERCHAIN_TRANSFER = 'interchain_transfer'
}

export type BridgeType = (typeof BridgeTypes)[keyof typeof BridgeTypes]

type BridgeMemo = {
  Memo: {
    MemoType: string
    MemoData: string
  }
}

type CreateBridgeMemoParams = {
  bridgeType: BridgeType
  destinationAddress: string
  destinationChain: string
  gasFeeAmount: string
  toAddress: string
}

export const BRIDGE_CONSTANTS = {
  HASH_LENGTH: 32
} as const

/**
 * Generate a payload hash
 * @param params - The parameters for the payload hash
 * @returns The payload hash
 */
export const generatePayloadHash = (params: CreateBridgeMemoParams): string => {
  const {
    bridgeType,
    destinationChain,
    toAddress,
    destinationAddress,
    gasFeeAmount
  } = params

  const timestamp = dayjs().unix()
  const hashInput = [
    bridgeType,
    destinationAddress,
    addressTo32(destinationChain),
    addressTo32(toAddress),
    gasFeeAmount,
    timestamp.toString()
  ].join('')

  return keccak256(toUtf8Bytes(hashInput))
}

/**
 * Create a bridge memo
 * @param params - The parameters for the bridge memo
 * @returns The bridge memo
 */
export const createBridgeMemo = ({
  bridgeType,
  destinationAddress,
  destinationChain,
  gasFeeAmount,
  toAddress
}: CreateBridgeMemoParams): { Memos: BridgeMemo[] } => {
  const bridgeTypeMemo: BridgeMemo = {
    Memo: {
      MemoType: stringToHex('type'),
      MemoData: stringToHex(bridgeType)
    }
  }

  const destinationAddressMemo: BridgeMemo = {
    Memo: {
      MemoType: stringToHex('destination_address'),
      MemoData: addressTo32(destinationAddress)
    }
  }

  const destinationChainMemo: BridgeMemo = {
    Memo: {
      MemoType: stringToHex('destination_chain'),
      MemoData: stringToHex(destinationChain)
    }
  }

  const gasFeeAmountMemo: BridgeMemo = {
    Memo: {
      MemoType: stringToHex('gas_fee_amount'),
      MemoData: stringToHex(gasFeeAmount)
    }
  }

  // Generate a payload hash
  const paddedAddress = padAddressTo32Bytes(
    toAddress,
    BRIDGE_CONSTANTS.HASH_LENGTH
  )
  const hash = generatePayloadHash({
    bridgeType,
    destinationAddress,
    destinationChain,
    gasFeeAmount,
    toAddress
  })

  const payloadMemo: BridgeMemo = {
    Memo: {
      MemoType: stringToHex('payload'),
      MemoData: [
        paddedAddress.padStart(64, '0').toUpperCase(),
        hash.slice(2).padStart(64, '0').toUpperCase()
      ].join('')
    }
  }

  return {
    Memos: [
      bridgeTypeMemo,
      destinationAddressMemo,
      destinationChainMemo,
      gasFeeAmountMemo,
      payloadMemo
    ]
  }
}
