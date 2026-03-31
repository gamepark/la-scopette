import { TokenDescription } from '@gamepark/react-game'
import { ScopetteTokenHelp } from './help/ScopetteTokenHelp'
import ScopetteToken from '../images/token/ScopetteTokenFront.jpg'

export class ScopetteTokenDescription extends TokenDescription {
  width = 2.5
  height = 2.5
  borderRadius = 2.5
  help = ScopetteTokenHelp

  image = ScopetteToken
}

export const scopetteTokenDescription = new ScopetteTokenDescription()
