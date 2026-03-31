import { css } from '@emotion/react'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { numberCardDescription } from '../material/NumberCardDescription.ts'
import { StackSpotCounter } from './component/StackSpotCounter.tsx'

export class NumberCardDeckLocator extends DeckLocator {
  coordinates = { x: -20, y: 0 }

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
