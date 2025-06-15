import { AbiCoder } from 'ethers'
import { MessageTypes } from '@/utils/bridge'

type CreateInterchainTransferPayloadParams = {
  //
}

type CreateDeployInterchainTokenPayloadParams = {
  messageType: MessageTypes.DEPLOY_INTERCHAIN_TOKEN
  name: string
  symbol: string
  decimals: number
  minter: string
}

export const createInterchainTransferPayload = (
  params: CreateInterchainTransferPayloadParams
) => {}

export const createDeployInterchainTokenPayload = (
  params: CreateDeployInterchainTokenPayloadParams
): string => {
  const payload = AbiCoder.defaultAbiCoder().encode(
    ['uint256', 'bytes32', 'string', 'string', 'uint8', 'bytes'],
    [
      params.messageType,
      params.name,
      params.symbol,
      params.decimals,
      params.minter
    ]
  )

  return payload
}
