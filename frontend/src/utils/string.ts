import { stringToHex as stringToHexOnXrpl } from '@xrplf/isomorphic/utils'

/**
 * Shorten a string by replacing the middle characters with "..."
 * @param s - The string to shorten
 * @param length - The length of the string to keep at the start and end
 * @returns The shortened string
 */
export const shortenString = (s: string, length: number): string => {
  return s.slice(0, length) + '...' + s.slice(-length)
}

/**
 * Convert a string to a hex string
 * @param s - The string to convert
 * @returns The hex string
 */
export const stringToHex = (s: string): string => {
  return stringToHexOnXrpl(s)
}

/**
 * Convert a hex string to a string
 * @param s - The hex string to convert
 * @returns The string
 */
export const hexToString = (s: string): string => {
  return Buffer.from(s, 'hex').toString('utf8')
}

/**
 * Convert an address to a 32-byte string
 * @param address - The address to convert
 * @returns The 32-byte string
 */
export const addressTo32 = (address: string): string => {
  return address.replace(/^0x/i, '').padStart(40, '0')
}

/**
 * Pad an address to 32 bytes
 * @param address - The address to pad
 * @param hashLength - The length of the hash
 * @returns The padded address
 */
export const padAddressTo32Bytes = (
  address: string,
  hashLength: number
): string => {
  const address32 = addressTo32(address)
  const paddingLength = hashLength * 2 - address32.length // 1バイト = 2文字
  return '0'.repeat(paddingLength) + address32
}
