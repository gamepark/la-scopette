import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { numberCardsTableLocator } from './NumberCardsTableLocator.ts'

export class CardsInPlayLayoutLocator extends ListLocator {
  gap = {x: 7}

  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const base = numberCardsTableLocator.getCoordinates(_location, context)
    return {
      y: (base.y ?? 0) + 10,
      x: base.x
    }
  }
}

export const cardsInPlayLayoutLocator = new CardsInPlayLayoutLocator()
