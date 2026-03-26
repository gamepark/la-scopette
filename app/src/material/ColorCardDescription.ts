import { Colors } from '@gamepark/la-scopette/material/Colors.ts'
import { CardDescription } from '@gamepark/react-game'
import Back from '../images/Card/colors/ColorBack.jpg'
import Green from '../images/Card/colors/ColorGreen.jpg'
import Orange from '../images/Card/colors/ColorOrange.jpg'
import Teal from '../images/Card/colors/ColorTeal.jpg'
import Pink from '../images/Card/colors/ColorPink.jpg'
import Purple from '../images/Card/colors/ColorPurple.jpg'
import Yellow from '../images/Card/colors/ColorYellow.jpg'

export class ColorCardDescription extends CardDescription {
  width = 5
  height = 5
  borderRadius = 0.3

  backImage = Back

  images = {
    [Colors.Green]: Green,
    [Colors.Orange]: Orange,
    [Colors.Teal]: Teal,
    [Colors.Pink]: Pink,
    [Colors.Purple]: Purple,
    [Colors.Yellow]: Yellow,
  }
}

export const colorCardDescription = new ColorCardDescription()
