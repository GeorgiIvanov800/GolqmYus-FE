export interface Artist {
  id: number
  nickname: string
  fistName: string
  lastName: string
  bornDate: string
  biography: string
  pictureUrl: string
  city: string
  socialMediaLinks: Record<string, string>
}
