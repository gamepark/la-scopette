import { isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'

export class CheckScopettesRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove<number, number>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    const playerEmpty = this.playerCards.length === 0
    const tableEmpty = this.tableCards.length === 0

    if (!playerEmpty && !tableEmpty) {
      return [this.startRule(RuleId.DrawCard)]
    }

    const tokenCount = playerEmpty && tableEmpty ? 4 : 1
    return this.material(MaterialType.ScopetteToken)
      .location(LocationType.ScopetteTokenStock)
      .limit(tokenCount)
      .moveItems({ type: LocationType.PlayerScopetteTokenStock, player: this.player })
  }

  afterItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove<number, number, number, number, number>[] {
    if(isMoveItem(_move) && _move.location.type === LocationType.PlayerScopetteTokenStock) {
      return [this.startRule(RuleId.DrawCard)]
    }
    return []
  }

  get playerCards() {
    return this.material(MaterialType.NumberCard).location(LocationType.PlayerHand).player(this.player)
  }

  get tableCards() {
    return this.material(MaterialType.NumberCard).location(LocationType.Table)
  }
}
