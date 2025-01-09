export interface Artist {
  id: number
  nickname: string
  firstName: string
  lastName: string
  bornDate?: string
  biography: string
  pictureUrl: string
  city: string
  socialMediaLinks: Record<string, string>
}
