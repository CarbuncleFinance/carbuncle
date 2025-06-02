import { z } from 'zod'
import { ChainProtocol } from '@/domains/blockchain/types'

export const bridgeFormSchema = z.object({
  chain: z.object({
    protocol: z.nativeEnum(ChainProtocol),
    name: z.string(),
    network: z.string(),
    chainId: z.number()
  }),
  blockchain: z.string(),
  address: z
    .string()
    .min(1, 'BRIDGE_VALIDATION_ADDRESS_REQUIRED')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'BRIDGE_VALIDATION_ADDRESS_INVALID'),
  amount: z
    .string()
    .min(1, 'BRIDGE_VALIDATION_AMOUNT_REQUIRED')
    .regex(/^\d+(\.\d+)?$/, 'BRIDGE_VALIDATION_AMOUNT_INVALID')
    .refine(
      (val) => parseFloat(val) > 0,
      'BRIDGE_VALIDATION_AMOUNT_MUST_BE_POSITIVE'
    )
})
