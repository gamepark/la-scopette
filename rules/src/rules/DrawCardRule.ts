import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class DrawCardRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove<number, number>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    const playerWhoEndedGame: number | undefined = this.remind(Memory.PlayerWhoEndedGame)
    if(playerWhoEndedGame !== undefined) {
      if(playerWhoEndedGame === this.player) {
        return [this.endGame()]
      }
      return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
    }
    return [this.numberCardInDeck.moveItem({type: LocationType.PlayerHand, player: this.player})]
  }

  afterItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.PlayerHand) {
      if(this.material(MaterialType.NumberCard).location(LocationType.Deck).length === 0) {
        this.memorize(Memory.PlayerWhoEndedGame, this.player)
      }
      return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
    }
    return []
  }

  get numberCardInDeck() {
    return this.material(MaterialType.NumberCard).location(LocationType.Deck).maxBy(item => item.location.x ?? 0)
  }
}
