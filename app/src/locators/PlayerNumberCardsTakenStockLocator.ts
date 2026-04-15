import { DropAreaDescription, getRelativePlayerIndex, DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerHandLocator } from './PlayerHandLocator.ts'

export class PlayerNumberCardsTakenStockLocator extends DeckLocator {
  limit = 10

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): Partial<Coordinates> {
    const base = playerHandLocator.getCoordinates(location, context)
    const index = getRelativePlayerIndex(context, location.player)
    const gap = index === 0 ? 12 : 10
    return {
      y: base.y,
      x: base.x + gap
    }
  }

  locationDescription = new NumberCardLocatorDescription()
}

export class NumberCardLocatorDescription extends DropAreaDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.3
}

export const playerNumberCardsTakenStockLocator = new PlayerNumberCardsTakenStockLocator()
