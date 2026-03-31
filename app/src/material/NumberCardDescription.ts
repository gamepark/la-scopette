import { LocationType } from '@gamepark/la-scopette/material/LocationType.ts'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType.ts'
import { Numbers } from '@gamepark/la-scopette/material/Numbers.ts'
import { CardDescription, ItemContext } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { NumberCardHelp } from './help/NumberCardHelp'
import Back from '../images/Card/numbers/NumbersBack.jpg'
import Gold1 from '../images/Card/numbers/NumbersGold1.jpg'
import Gold4 from '../images/Card/numbers/NumbersGold4.jpg'
import Gold7 from '../images/Card/numbers/NumbersGold7.jpg'
import Gold10 from '../images/Card/numbers/NumbersGold10.jpg'
import Green1 from '../images/Card/numbers/NumbersGreen1.jpg'
import Green2 from '../images/Card/numbers/NumbersGreen2.jpg'
import Green3 from '../images/Card/numbers/NumbersGreen3.jpg'
import Green4 from '../images/Card/numbers/NumbersGreen4.jpg'
import Green5 from '../images/Card/numbers/NumbersGreen5.jpg'
import Green6 from '../images/Card/numbers/NumbersGreen6.jpg'
import Green7 from '../images/Card/numbers/NumbersGreen7.jpg'
import Green8 from '../images/Card/numbers/NumbersGreen8.jpg'
import Green9 from '../images/Card/numbers/NumbersGreen9.jpg'
import Green10 from '../images/Card/numbers/NumbersGreen10.jpg'
import GreenMinus1 from '../images/Card/numbers/NumbersGreen-1.jpg'
import GreenMinus2 from '../images/Card/numbers/NumbersGreen-2.jpg'
import Orange1 from '../images/Card/numbers/NumbersOrange1.jpg'
import Orange2 from '../images/Card/numbers/NumbersOrange2.jpg'
import Orange3 from '../images/Card/numbers/NumbersOrange3.jpg'
import Orange4 from '../images/Card/numbers/NumbersOrange4.jpg'
import Orange5 from '../images/Card/numbers/NumbersOrange5.jpg'
import Orange6 from '../images/Card/numbers/NumbersOrange6.jpg'
import Orange7 from '../images/Card/numbers/NumbersOrange7.jpg'
import Orange8 from '../images/Card/numbers/NumbersOrange8.jpg'
import Orange9 from '../images/Card/numbers/NumbersOrange9.jpg'
import Orange10 from '../images/Card/numbers/NumbersOrange10.jpg'
import OrangeMinus1 from '../images/Card/numbers/NumbersOrange-1.jpg'
import OrangeMinus2 from '../images/Card/numbers/NumbersOrange-2.jpg'
import Pink1 from '../images/Card/numbers/NumbersPink1.jpg'
import Pink2 from '../images/Card/numbers/NumbersPink2.jpg'
import Pink3 from '../images/Card/numbers/NumbersPink3.jpg'
import Pink4 from '../images/Card/numbers/NumbersPink4.jpg'
import Pink5 from '../images/Card/numbers/NumbersPink5.jpg'
import Pink6 from '../images/Card/numbers/NumbersPink6.jpg'
import Pink7 from '../images/Card/numbers/NumbersPink7.jpg'
import Pink8 from '../images/Card/numbers/NumbersPink8.jpg'
import Pink9 from '../images/Card/numbers/NumbersPink9.jpg'
import Pink10 from '../images/Card/numbers/NumbersPink10.jpg'
import PinkMinus1 from '../images/Card/numbers/NumbersPink-1.jpg'
import PinkMinus2 from '../images/Card/numbers/NumbersPink-2.jpg'
import Purple1 from '../images/Card/numbers/NumbersPurple1.jpg'
import Purple2 from '../images/Card/numbers/NumbersPurple2.jpg'
import Purple3 from '../images/Card/numbers/NumbersPurple3.jpg'
import Purple4 from '../images/Card/numbers/NumbersPurple4.jpg'
import Purple5 from '../images/Card/numbers/NumbersPurple5.jpg'
import Purple6 from '../images/Card/numbers/NumbersPurple6.jpg'
import Purple7 from '../images/Card/numbers/NumbersPurple7.jpg'
import Purple8 from '../images/Card/numbers/NumbersPurple8.jpg'
import Purple9 from '../images/Card/numbers/NumbersPurple9.jpg'
import Purple10 from '../images/Card/numbers/NumbersPurple10.jpg'
import PurpleMinus1 from '../images/Card/numbers/NumbersPurple-1.jpg'
import PurpleMinus2 from '../images/Card/numbers/NumbersPurple-2.jpg'
import Teal1 from '../images/Card/numbers/NumbersTeal1.jpg'
import Teal2 from '../images/Card/numbers/NumbersTeal2.jpg'
import Teal3 from '../images/Card/numbers/NumbersTeal3.jpg'
import Teal4 from '../images/Card/numbers/NumbersTeal4.jpg'
import Teal5 from '../images/Card/numbers/NumbersTeal5.jpg'
import Teal6 from '../images/Card/numbers/NumbersTeal6.jpg'
import Teal7 from '../images/Card/numbers/NumbersTeal7.jpg'
import Teal8 from '../images/Card/numbers/NumbersTeal8.jpg'
import Teal9 from '../images/Card/numbers/NumbersTeal9.jpg'
import Teal10 from '../images/Card/numbers/NumbersTeal10.jpg'
import TealMinus1 from '../images/Card/numbers/NumbersTeal-1.jpg'
import TealMinus2 from '../images/Card/numbers/NumbersTeal-2.jpg'
import Yellow1 from '../images/Card/numbers/NumbersYellow1.jpg'
import Yellow2 from '../images/Card/numbers/NumbersYellow2.jpg'
import Yellow3 from '../images/Card/numbers/NumbersYellow3.jpg'
import Yellow4 from '../images/Card/numbers/NumbersYellow4.jpg'
import Yellow5 from '../images/Card/numbers/NumbersYellow5.jpg'
import Yellow6 from '../images/Card/numbers/NumbersYellow6.jpg'
import Yellow7 from '../images/Card/numbers/NumbersYellow7.jpg'
import Yellow8 from '../images/Card/numbers/NumbersYellow8.jpg'
import Yellow9 from '../images/Card/numbers/NumbersYellow9.jpg'
import Yellow10 from '../images/Card/numbers/NumbersYellow10.jpg'
import YellowMinus1 from '../images/Card/numbers/NumbersYellow-1.jpg'
import YellowMinus2 from '../images/Card/numbers/NumbersYellow-2.jpg'

export class NumberCardDescription extends CardDescription {
  width = 6.3
  height = 8.8
  borderRadius = 0.3
  help = NumberCardHelp

  backImage = Back

  images = {
    [Numbers.Gold1]: Gold1,
    [Numbers.Gold4]: Gold4,
    [Numbers.Gold7]: Gold7,
    [Numbers.Gold10]: Gold10,
    [Numbers.Green1]: Green1,
    [Numbers.Green2]: Green2,
    [Numbers.Green3]: Green3,
    [Numbers.Green4]: Green4,
    [Numbers.Green5]: Green5,
    [Numbers.Green6]: Green6,
    [Numbers.Green7]: Green7,
    [Numbers.Green8]: Green8,
    [Numbers.Green9]: Green9,
    [Numbers.Green10]: Green10,
    [Numbers.GreenMinus1]: GreenMinus1,
    [Numbers.GreenMinus2]: GreenMinus2,
    [Numbers.Orange1]: Orange1,
    [Numbers.Orange2]: Orange2,
    [Numbers.Orange3]: Orange3,
    [Numbers.Orange4]: Orange4,
    [Numbers.Orange5]: Orange5,
    [Numbers.Orange6]: Orange6,
    [Numbers.Orange7]: Orange7,
    [Numbers.Orange8]: Orange8,
    [Numbers.Orange9]: Orange9,
    [Numbers.Orange10]: Orange10,
    [Numbers.OrangeMinus1]: OrangeMinus1,
    [Numbers.OrangeMinus2]: OrangeMinus2,
    [Numbers.Pink1]: Pink1,
    [Numbers.Pink2]: Pink2,
    [Numbers.Pink3]: Pink3,
    [Numbers.Pink4]: Pink4,
    [Numbers.Pink5]: Pink5,
    [Numbers.Pink6]: Pink6,
    [Numbers.Pink7]: Pink7,
    [Numbers.Pink8]: Pink8,
    [Numbers.Pink9]: Pink9,
    [Numbers.Pink10]: Pink10,
    [Numbers.PinkMinus1]: PinkMinus1,
    [Numbers.PinkMinus2]: PinkMinus2,
    [Numbers.Purple1]: Purple1,
    [Numbers.Purple2]: Purple2,
    [Numbers.Purple3]: Purple3,
    [Numbers.Purple4]: Purple4,
    [Numbers.Purple5]: Purple5,
    [Numbers.Purple6]: Purple6,
    [Numbers.Purple7]: Purple7,
    [Numbers.Purple8]: Purple8,
    [Numbers.Purple9]: Purple9,
    [Numbers.Purple10]: Purple10,
    [Numbers.PurpleMinus1]: PurpleMinus1,
    [Numbers.PurpleMinus2]: PurpleMinus2,
    [Numbers.Teal1]: Teal1,
    [Numbers.Teal2]: Teal2,
    [Numbers.Teal3]: Teal3,
    [Numbers.Teal4]: Teal4,
    [Numbers.Teal5]: Teal5,
    [Numbers.Teal6]: Teal6,
    [Numbers.Teal7]: Teal7,
    [Numbers.Teal8]: Teal8,
    [Numbers.Teal9]: Teal9,
    [Numbers.Teal10]: Teal10,
    [Numbers.TealMinus1]: TealMinus1,
    [Numbers.TealMinus2]: TealMinus2,
    [Numbers.Yellow1]: Yellow1,
    [Numbers.Yellow2]: Yellow2,
    [Numbers.Yellow3]: Yellow3,
    [Numbers.Yellow4]: Yellow4,
    [Numbers.Yellow5]: Yellow5,
    [Numbers.Yellow6]: Yellow6,
    [Numbers.Yellow7]: Yellow7,
    [Numbers.Yellow8]: Yellow8,
    [Numbers.Yellow9]: Yellow9,
    [Numbers.Yellow10]: Yellow10,
    [Numbers.YellowMinus1]: YellowMinus1,
    [Numbers.YellowMinus2]: YellowMinus2,
  }

  canShortClick(move: MaterialMove, context: ItemContext): boolean {
    return isMoveItemType(MaterialType.NumberCard)(move) && move.itemIndex === context.index && move.location.type === LocationType.CardsInPlayLayout
      || isMoveItemType(MaterialType.NumberCard)(move) && move.itemIndex === context.index && move.location.player === context.player && move.location.type === LocationType.PlayerNumberCardsTakenStock
  }
}

export const numberCardDescription = new NumberCardDescription()
