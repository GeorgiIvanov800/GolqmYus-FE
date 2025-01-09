import apiClient from '@/config/axios'
import { logger } from '@/utils/logger'
import type { UserRegister } from '@/views/Register/Types/UserRegister'

export const registerUser = async (userData: UserRegister): Promise<void> => {
  try {
    const response = await apiClient.post('/users/register', userData)
  } catch (e) {
    logger.log(e)
  }
}
