'use client'

export function useSendTransaction() {
  const sendTransaction = async (transaction: any) => {
    console.log('sendTransaction', transaction)
  }

  return {
    sendTransaction
  }
}
