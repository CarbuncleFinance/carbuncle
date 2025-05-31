import { AppErrorCode } from '@/types/enums'

export class AppError extends Error {
  constructor(
    public code: AppErrorCode,
    public title: string,
    public message: string
  ) {
    super(message)
    this.name = 'AppError'
  }

  static fromError(error: Error): AppError {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof Error) {
      return new AppError(AppErrorCode.UNKNOWN_ERROR, 'Error', error.message)
    }

    return new AppError(
      AppErrorCode.UNKNOWN_ERROR,
      'Error',
      'An unknown error occurred'
    )
  }
}
