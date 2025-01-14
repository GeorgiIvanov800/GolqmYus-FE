export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  token: string
  username: string
  imgUrl: string
}
