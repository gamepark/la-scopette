import { getEnumValues } from '@gamepark/rules-api'

export enum Colors {
  Green = 1,
  Orange,
  Pink,
  Purple,
  Teal,
  Yellow,
  Gold
}

export const colorCards = getEnumValues(Colors).filter(color => color !== Colors.Gold)