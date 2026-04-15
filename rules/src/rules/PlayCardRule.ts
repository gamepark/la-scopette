import { CustomMove, isCustomMoveType, isMoveItem, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { numberCardData, Numbers } from '../material/Numbers'
import { CustomMoveType } from './CustomMoveType'
import { PlayCardHelper } from './helper/PlayCardHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class PlayCardRule extends PlayerTurnRule {
  playCardHelper = new PlayCardHelper(this.game)
  getPlayerMoves(): MaterialMove[] {
    const moves: MaterialMove[] = []

    moves.push(...this.playCardHelper.canPassIfLessThan3CardInHand())

    moves.push(...this.playCardHelper.takeCardMatchingSumOrDontTakeCardIfOneCardInPlay())

    moves.push(...this.playCardHelper.playOnCardIfNoCardInPlay())

    const sumOfAlreadyTakenCards = this.remind(Memory.Sum) ?? 0
    if(sumOfAlreadyTakenCards === 0) {
      if (this.cardsInPlay.length > 0) {
        moves.push(...this.playCardHelper.canPlayOtherCardIfWeCanTakeCardAfter())
      }
      if (this.cardsInPlay.length > 1) {
        moves.push(...this.playCardHelper.getCardWithTotalMoves())
      }
    }

    return moves
  }

  afterItemMove(_move: ItemMove<number, number, number>, _context?: PlayMoveContext): MaterialMove[] {
    const moves: MaterialMove[] = []
    if(isMoveItem(_move) && _move.location.type === LocationType.PlayerNumberCardsTakenStock) {
      moves.push(...this.startNextRuleIfTakenCardSumMatchToPlayCardsSumOrUpdateSum(_move))
    }
    if(isMoveItem(_move) && _move.location.type === LocationType.Table) {
      moves.push(this.startRule(RuleId.DrawCard))
    }
    return moves
  }

  private startNextRuleIfTakenCardSumMatchToPlayCardsSumOrUpdateSum(_move: ItemMove) {
    if(!isMoveItem(_move)) return []
    const moves: MaterialMove[] = []
    let sum = this.remind(Memory.Sum) ?? 0
    const card = this.material(MaterialType.NumberCard).getItem(_move.itemIndex)
    sum += numberCardData[card.id as Numbers].number
    if (sum === this.playCardHelper.calculTotalCardsInPlay()) {
      this.memorize(Memory.Sum, 0)
      moves.push(this.startRule(RuleId.CheckScopettes))
    } else {
      this.memorize(Memory.Sum, sum)
    }
    return moves
  }

  onCustomMove(move: CustomMove, _context?: PlayMoveContext): MaterialMove[] {
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return [this.startRule(RuleId.DrawCard)]
    }
    if (isCustomMoveType(CustomMoveType.DontTakeCards)(move)) {
      return this.cardsInPlay.moveItems({type: LocationType.Table})
    }
    return []
  }

  onRuleEnd(_move: RuleMove<number, number>, _context?: PlayMoveContext): MaterialMove[] {
    if(this.cardsInPlay.length > 0) {
      return this.cardsInPlay.moveItems({type: LocationType.PlayerNumberCardsTakenStock, player: this.player})
    }
    return []
  }

  get cardsInPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.CardsInPlayLayout)
  }
}
