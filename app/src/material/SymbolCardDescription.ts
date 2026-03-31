import { Symbols } from '@gamepark/la-scopette/material/Symbols.ts'
import { CardDescription } from '@gamepark/react-game'
import { SymbolCardHelp } from './help/SymbolCardHelp'
import Coin from '../images/Card/symbols/SymbolCoin.jpg'
import Die from '../images/Card/symbols/SymbolDie.jpg'
import Elephant from '../images/Card/symbols/SymbolElephant.jpg'
import Shamrock from '../images/Card/symbols/SymbolShamrock.jpg'
import ShootingStar from '../images/Card/symbols/SymbolShootingStar.jpg'
import HorseShoe from '../images/Card/symbols/SymbolHorseShoe.jpg'

export class SymbolCardDescription extends CardDescription {
  width = 5
  height = 5
  borderRadius = 0.1
  help = SymbolCardHelp

  images = {
    [Symbols.Coin]: Coin,
    [Symbols.Die]: Die,
    [Symbols.Elephant]: Elephant,
    [Symbols.Shamrock]: Shamrock,
    [Symbols.ShootingStar]: ShootingStar,
    [Symbols.HorseShoe]: HorseShoe,
  }
}

export const symbolCardDescription = new SymbolCardDescription()
