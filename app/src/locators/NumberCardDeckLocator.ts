import { css } from '@emotion/react'
import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { numberCardDescription } from '../material/NumberCardDescription.ts'
import { StackSpotCounter } from './component/StackSpotCounter.tsx'

export class NumberCardDeckLocator extends DeckLocator {
  getCoordinates(_location: Location, context: MaterialContext): Partial<Coordinates> {
    const nbPlayers = context.rules.players.length
    switch (nbPlayers) {
      case 2:
        return { x: -20, y: -6 }
      case 3:
      case 4:
        return { x: -20, y: 6 }
      default:
        return { x: -30, y: 0 }
    }
  }

  location = {}

  navigationSorts = []

  locationDescription = new FaceCardDeckDescription(numberCardDescription)
}

class FaceCardDeckDescription extends LocationDescription {
  content = StackSpotCounter

  extraCss = css`
    position: relative;

    > span {
      position: absolute;
      bottom: -4rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.75em;
      font-weight: bolder;
      color: white;
      opacity: 0.7;
      text-shadow:
        3px 3px 0 #000,
        -3px 3px 0 #000,
        -3px -3px 0 #000,
        3px -3px 0 #000;
      margin-right: 0.2em;
    }
  `
}

export const numberCardDeckLocator = new NumberCardDeckLocator()
