import { DropAreaDescription, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { playerHandLocator } from './PlayerHandLocator.ts'

export class PlayerNumberCardsTakenStockLocator extends ListLocator {
  gap = {x: 6}
  rotateZ = 90

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): Partial<Coordinates> {
    const base = playerHandLocator.getCoordinates(location, context)
    const gap = base.y > 0 ? 8 : -8
    return {
      y: base.y + gap,
      x: base.x,
      z: 0,
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
