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
    this.material(MaterialType.NumberCard).createItems(shuffle(numberCards).map(id => ({ id, location: { type:  LocationType.Deck} })))
    this.players.forEach( (player, index) => {
        this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3).moveItems({ type: LocationType.PlayerHand, player })
        this.material(MaterialType.ColorCard).createItem({ id: colorCards[index], location: { type:  LocationType.PlayerColorCard, player} })
        this.material(MaterialType.SymbolCard).createItem({ id: symbolCards[index], location: { type:  LocationType.PlayerSymbolCard, player} })

      }
    )
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(4).moveItems({ type: LocationType.Table })
    for (let i = 0; i < 24; i++) {
      this.material(MaterialType.ScopetteToken).createItem({ location: { type: LocationType.ScopetteTokenStock } })
    }
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
