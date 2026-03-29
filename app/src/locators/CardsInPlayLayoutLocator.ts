import { ListLocator } from '@gamepark/react-game'

export class CardsInPlayLayoutLocator extends ListLocator {
  gap = {x: 7}
  coordinates = { x: 0, y: 10 }
}

export const cardsInPlayLayoutLocator = new CardsInPlayLayoutLocator()
