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
    const pointForColor = this.getPlayerTakenCards(player).filter(it => this.getPlayerColor(player).includes(it.color)).length
    const pointForSymbol = this.getPlayerTakenCards(player).filter(it => it.symbol && this.getPlayerSymbols(player).includes(it.symbol)).length
    const pointForGoldenCards = this.getPlayerGoldCardsScore(player)
    const pointForScopetteTokens = this.getPlayerScopetteTokens(player)
    return pointForColor + pointForSymbol + pointForGoldenCards + pointForScopetteTokens
  }

  getPlayerScopetteTokens(player: number) {
    const playerScopettes = this.material(MaterialType.ScopetteToken).location(LocationType.PlayerScopetteTokenStock).player(player)
    if(!playerScopettes) return 0
    return playerScopettes.getQuantity() ? playerScopettes.getQuantity() : playerScopettes.getItems().length
  }

  getPlayerTakenCards(player: number) {
    return this.material(MaterialType.NumberCard).location(LocationType.PlayerNumberCardsTakenStock).player(player).getItems().map(it => numberCardData[it.id as Numbers])
  }

  getPlayerColor(player: number) {
    return this.material(MaterialType.ColorCard).location(LocationType.PlayerColorCard).player(player).getItems().map(it => it.id as Colors)
  }

  getPlayerSymbols(player: number) {
    const symbol1 = this.material(MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(player).getItem()?.id as Symbols
    const playerIndex = this.game.players.indexOf(player)
    const otherSymbolPlayer = playerIndex === 0 ? this.game.players[this.game.players.length - 1] : this.game.players[playerIndex - 1]
    const symbol2 = this.material(MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(otherSymbolPlayer).getItem()?.id as Symbols
    return [symbol1, symbol2]
  }

  getPlayerColorScore(player: number, color: Colors) {
    return this.getPlayerTakenCards(player).filter(it => it.color === color).length
  }

  getPlayerGoldCardsScore(player: number) {
    return this.getPlayerTakenCards(player).filter(it => it.color === Colors.Gold).length
  }

  getPlayerSymbolScore(player: number, symbol: Symbols) {
    return this.getPlayerTakenCards(player).filter(it => it.symbol === symbol).length
  }
}
