import { MaterialGameSetup } from '@gamepark/rules-api'
import { shuffle } from 'es-toolkit'
import { LaScopetteRules } from './LaScopetteRules'
import { LaScopetteOptions } from './LaScopetteOptions'
import { colorCards } from './material/Colors'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { numberCards } from './material/Numbers'
import { symbolCards } from './material/Symbols'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class LaScopetteSetup extends MaterialGameSetup<number, MaterialType, LocationType, LaScopetteOptions> {
  Rules = LaScopetteRules

  setupMaterial(_options: LaScopetteOptions) {
    const shuffledColors = shuffle(colorCards)
    const shuffledSymbols = shuffle(symbolCards)
    this.material(MaterialType.NumberCard).createItems(shuffle(numberCards).map(id => ({ id, location: { type:  LocationType.Deck} })))
    this.players.forEach( (player, index) => {
        this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3).moveItems({ type: LocationType.PlayerHand, player })
        this.material(MaterialType.ColorCard).createItem({ id: shuffledColors[index], location: { type: LocationType.PlayerColorCard, player, rotation: true } })
        this.material(MaterialType.SymbolCard).createItem({ id: shuffledSymbols[index], location: { type:  LocationType.PlayerSymbolCard, player} })
      }
    )
    if(this.players.length === 2) {
      this.players.forEach( (player, index) => {
          this.material(MaterialType.ColorCard).createItem({ id: shuffledColors[index + 2], location: { type: LocationType.PlayerColorCard, player, rotation: true } })
        }
      )
    }
    const centerCount = this.players.length === 5 ? 6 : 4
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(centerCount).moveItems({ type: LocationType.Table })
    for (let i = 0; i < 24; i++) {
      this.material(MaterialType.ScopetteToken).createItem({ location: { type: LocationType.ScopetteTokenStock } })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.PlayCard, this.players[0])
  }
}
