import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'
import { playerHandLocator } from './PlayerHandLocator.ts'

const BOTTOM_LEFT = { x: -38, y: 22 }
const BOTTOM_RIGHT = { x: 38, y: 22 }
const TOP_LEFT = { x: -38, y: -22 }
const TOP_RIGHT = { x: 38, y: -22 }
const TOP_CENTER = { x: 0, y: -22 }
const BOTTOM_CENTER = { x: 0, y: 22 }

class PlayerSymbolCardLocator extends Locator {

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): Partial<Coordinates> {
    const base = playerHandLocator.getCoordinates(location, context)
    if(isSameLocation(base, BOTTOM_LEFT)) return { x: -45, y: 0 }
    if(isSameLocation(base, BOTTOM_RIGHT)) return { x: 20, y: 26 }
    if(isSameLocation(base, BOTTOM_CENTER)) return { x: -20, y: 26 }
    if(isSameLocation(base, TOP_LEFT)) return { x: -20, y: -26 }
    if(isSameLocation(base, TOP_RIGHT)) return { x: 45, y: 0 }
    if(isSameLocation(base, TOP_CENTER)) return { x: 20, y: -26 }
    return base
  }
}

export const playerSymbolCardLocator = new PlayerSymbolCardLocator()

const isSameLocation = (Location: Partial<Coordinates>, other: XYCoordinates) => {
  return Location.x === other.x && Location.y === other.y
}