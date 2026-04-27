import { getEnumValues } from '@gamepark/rules-api'

export enum Symbols {
  Coin = 1,
  Die,
  Elephant,
  HorseShoe,
  Shamrock,
  ShootingStar
}

export const symbolCards = getEnumValues(Symbols)