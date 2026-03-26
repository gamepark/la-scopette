import { ListLocator } from '@gamepark/react-game'

export class NumberCardsTableLocator extends ListLocator {
  gap = {x: 7}
  coordinates = { x: -10, y: 0 }
}

export const numberCardsTableLocator = new NumberCardsTableLocator()
