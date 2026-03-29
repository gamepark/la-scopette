import { MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import { Colors } from '../../material/Colors'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { numberCardData, Numbers } from '../../material/Numbers'
import { Symbols } from '../../material/Symbols'


export class ScoreHelper extends MaterialRulesPart {

  constructor(game: MaterialGame) {
    super(game)
  }

  calculateScore(player: number) {
    const pointForColor = this.gePlayerTakenCards(player).filter(it => this.gePlayerColor(player).includes(it.color)).length
    const pointForSymbol = this.gePlayerTakenCards(player).filter(it => it.symbol && this.gePlayerSymbols(player).includes(it.symbol)).length
    const pointForGoldenCards = this.gePlayerTakenCards(player).filter(it => it.color === Colors.Gold).length
    const pointForScopetteTokens = this.getPlayerScopetteTokens(player).length
    return pointForColor + pointForSymbol + pointForGoldenCards + pointForScopetteTokens
  }

  getPlayerScopetteTokens(player: number) {
    return this.material(MaterialType.ScopetteToken).location(LocationType.PlayerScopetteTokenStock).player(player).getItems()
  }

  gePlayerTakenCards(player: number) {
    return this.material(MaterialType.NumberCard).location(LocationType.PlayerNumberCardsTakenStock).player(player).getItems().map(it => numberCardData[it.id as Numbers])
  }

  gePlayerColor(player: number) {
    return this.material(MaterialType.ColorCard).location(LocationType.PlayerColorCard).player(player).getItems().map(it => it.id as Colors)
  }

  gePlayerSymbols(player: number) {
    const symbol1 = this.material(MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(player).getItem()?.id as Symbols
    const playerIndex = this.game.players.indexOf(player)
    const otherSymbolPlayer = playerIndex === 0 ? this.game.players[this.game.players.length - 1] : this.game.players[playerIndex - 1]
    const symbol2 = this.material(MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(otherSymbolPlayer).getItem()?.id as Symbols
    return [symbol1, symbol2]
  }
}
