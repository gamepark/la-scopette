import { DeckLocator } from '@gamepark/react-game'

export class NumberCardDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: 0 }
}

export const numberCardDeckLocator = new NumberCardDeckLocator()
