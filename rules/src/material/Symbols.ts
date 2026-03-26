import { getEnumValues } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit'

export enum Symbols {
  Coin = 1,
  Die,
  Elephant,
  HorseShoe,
  Shamrock,
  ShootingStar
}

export const symbolCards = shuffle(getEnumValues(Symbols))