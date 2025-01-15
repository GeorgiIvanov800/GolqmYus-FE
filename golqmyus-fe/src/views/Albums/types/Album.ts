export interface Album {
  id: string | number
  title: string
  releaseDate: string
  genre: string
  description: string
  imageUrl: string
  isOpen?: boolean
}
