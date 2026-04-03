import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { numberCardDeckLocator } from './NumberCardDeckLocator.ts'

export class NumberCardsTableLocator extends ListLocator {
  gap = {x: 7}
  maxCount = 6

  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const base = numberCardDeckLocator.getCoordinates(_location, context)
    return {
      y: base.y,
      x: (base.x ?? 0) + 10
    }
  }
}

export const numberCardsTableLocator = new NumberCardsTableLocator()
