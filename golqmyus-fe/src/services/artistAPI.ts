import apiClient from '../config/axios'
import { logger } from '@/utils/logger'

export async function getAllArtists() {
  try {
    const res = await apiClient.get('/artists')
    return res.data
  } catch (e) {
    logger.error(e)
    return []
  }
}
