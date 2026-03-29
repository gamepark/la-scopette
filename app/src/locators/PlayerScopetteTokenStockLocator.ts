import { PileLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerHandLocator } from './PlayerHandLocator.ts'

export class PlayerScopetteTokenStockLocator extends PileLocator {
  radius = 1

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): Partial<Coordinates> {
    const base = playerHandLocator.getCoordinates(location, context)
    const gap = base.y > 0 ? -8 : 8
    return {
      y: base.y + gap,
      x: base.x + 10,
      z: 0,
    }
  }
}

export const playerScopetteTokenStockLocator = new PlayerScopetteTokenStockLocator()
