export interface Option {
  id: number
  optionText: string
}

export interface Question {
  id: number
  question: string
  text: string
  correctOption: string
  timeLimit: number
  options: Option[]
}

export type Answer = string
