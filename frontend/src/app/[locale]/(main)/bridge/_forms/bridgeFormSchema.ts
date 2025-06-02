import { z } from 'zod'

export const bridgeFormSchema = z.object({
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

export type BridgeFormSchema = typeof bridgeFormSchema
