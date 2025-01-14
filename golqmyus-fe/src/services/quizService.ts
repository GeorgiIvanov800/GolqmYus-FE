import apiClient from '../config/axios'
import { logger } from '@/utils/logger'

export async function getQuestions() {
  try {
    const res = await apiClient.get('/quiz/questions')
    return res.data
  } catch (e) {
    logger.error(e)
    return []
  }
}
