import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit'

export enum Colors {
  Green = 1,
  Orange,
  Pink,
  Purple,
  Teal,
  Yellow,
  Gold
}

export const colorCards = shuffle(getEnumValues(Colors).filter(color => color !== Colors.Gold))