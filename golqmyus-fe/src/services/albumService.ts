import apiClient from '@/config/axios'
import { logger } from '@/utils/logger'
import type { Album } from '@/views/Albums/types/Album'
import type { Track } from '@/views/Albums/types/Track'

export const fetchAlbums = async (artistId?: string): Promise<Album[]> => {
  try {
    const endpoint = artistId ? `albums/${artistId}/album` : '/albums'
    const response = await apiClient.get<Album[]>(endpoint)
    return response.data
  } catch (error) {
    logger.error(error)
    throw new Error()
  }
}

export const fetchAlbumAndTracks = async (
  albumId: number,
): Promise<{ album: Album; tracks: Track[] }> => {
  try {
    const [albumResponse, tracksResponse] = await Promise.all([
      apiClient.get<Album>(`/albums/${albumId}`),
      apiClient.get<Track[]>(`/albums/${albumId}/tracks`),
    ])

    return {
      album: albumResponse.data,
      tracks: tracksResponse.data,
    }
  } catch (error) {
    logger.error(error)
    throw new Error()
  }
}
