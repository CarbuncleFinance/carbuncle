import { z } from 'zod'

export const bridgeFormSchema = z.object({
  chainType: z.string(),
  blockchain: z.string(),
  address: z
    .string()
    .min(1, 'BRIDGE_VALIDATION_ADDRESS_REQUIRED')
    .regex(/^0x[a-fA-F0-9]{40}$/, 'BRIDGE_VALIDATION_ADDRESS_INVALID'),
  amount: z
    .string()
    .min(1, 'BRIDGE_VALIDATION_AMOUNT_REQUIRED')
    .regex(/^\d+(\.\d+)?$/, 'BRIDGE_VALIDATION_AMOUNT_INVALID')
})
