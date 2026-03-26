import { PileLocator } from '@gamepark/react-game'

export class ScopetteTokenStockLocator extends PileLocator {
  radius = 1.5
  coordinates = { x: 20, y: -10 }
}

export const scopetteTokenStockLocator = new ScopetteTokenStockLocator()
