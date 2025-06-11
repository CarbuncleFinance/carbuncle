import { z, ZodObject } from 'zod'

export const createFieldValidator = (fieldName: string, schema: any) => {
  return ({ value }: { value: string }) => {
    const result = schema.shape[fieldName].safeParse(value)
    return result.success ? undefined : result.error.issues[0]?.message
  }
}
