import apiClient from '@/config/axios'
import type { LoginResponse, LoginRequest } from '@/types/auth'
import { logger } from '@/utils/logger'
import type { UserRegister } from '@/views/Register/Types/UserRegister'

export const registerUser = async (userData: UserRegister): Promise<void> => {
  try {
    const response = await apiClient.post('/users/register', userData)
  } catch (error: unknown) {
    logger.error(error)
  }
}

export const loginUser = async (loginData: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/users/login', loginData)
    return response.data
  } catch (error: unknown) {
    logger.error(error)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error instanceof Error && (error as any).response?.data?.error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error((error as any).response.data.error)
    }
    throw new Error('An error occurred during login.')
  }
}

export const checkUsername = async (username: string): Promise<boolean> => {
  try {
    const response = await apiClient.get<boolean>('/users/check-username', {
      params: { username },
    })
    return response.data
  } catch (error: unknown) {
    logger.error(error)
    throw new Error()
  }
}
