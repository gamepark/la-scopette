import { MaterialGame, MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { numberCardData, Numbers } from '../../material/Numbers'
import { CustomMoveType } from '../CustomMoveType'
import { Memory } from '../Memory'


export class PlayCardHelper extends MaterialRulesPart {
  player?: number

  constructor(game: MaterialGame, player = game.rule?.player) {
    super(game)
    this.player = player
  }

  canPlayOtherCardIfWeCanTakeCardAfter() {
    const moves: MaterialMove[] = []
    this.playerCards.getItems().forEach(card => {
      const cardValue = numberCardData[card.id as Numbers].number
      if (this.getCardWithTotalMoves(cardValue).length > 0) {
        moves.push(...this.playerCards.filter(c => c.id === card.id).moveItems({ type: LocationType.CardsInPlayLayout }))
      }
    })
    return moves
  }

  playOnCardIfNoCardInPlay() {
    const moves: MaterialMove[] = []
    if(this.cardsInPlay.length === 0) {
      moves.push(...this.playerCards.moveItems({type: LocationType.CardsInPlayLayout}))
    }
    return moves
  }

  takeCardMatchingSumOrDontTakeCardIfOneCardInPlay() {
    const moves: MaterialMove[] = []
    if (this.cardsInPlay.length === 1) {
      const sumOfAlreadyTakenCards = this.remind(Memory.Sum) ?? 0
      if(sumOfAlreadyTakenCards === 0) {
        moves.push(this.customMove(CustomMoveType.DontTakeCards))
      }
      moves.push(...this.getTableCardsMatchingSumMoves())
    }
    return moves
  }

  canPassIfLessThan3CardInHand() {
    const moves: MaterialMove[] = []
    if (this.playerCards.length < 3 && this.cardsInPlay.length === 0) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }
    return moves
  }

  getCardWithTotalMoves(extra = 0): MaterialMove[] {
    const moves: MaterialMove[] = []
    const total = this.calculTotalCardsInPlay() + extra
    const cardsWithTotal = this.tableCards.filter(c => numberCardData[c.id as Numbers].number === total)
    if(cardsWithTotal.length > 0) {
      moves.push(...cardsWithTotal.moveItems({type: LocationType.PlayerNumberCardsTakenStock, player: this.player}))
    }
    return moves
  }

  getTableCardsMatchingSumMoves(extra = 0): MaterialMove[] {
    const target = this.calculTotalCardsInPlay() + extra - (this.remind(Memory.Sum) ?? 0)
    const cards = this.tableCards.getItems()
    const validIds = new Set<number>()

    const findSubsets = (index: number, remaining: number, current: number[]) => {
      if (remaining === 0) {
        current.forEach(id => validIds.add(id))
        return
      }
      if (index >= cards.length) return
      const card = cards[index]
      const num = numberCardData[card.id as Numbers].number
      findSubsets(index + 1, remaining - num, [...current, card.id as number])
      findSubsets(index + 1, remaining, current)
    }

    findSubsets(0, target, [])
    return this.tableCards.filter(c => validIds.has(c.id as number)).moveItems({type: LocationType.PlayerNumberCardsTakenStock, player: this.player})
  }

  calculTotalCardsInPlay() {
    const cards = this.cardsInPlay.getItems()
    return cards.map(card => numberCardData[card.id as Numbers].number).reduce((acc, curr) => acc + curr, 0)
  }

  get playerCards() {
    return this.material(MaterialType.NumberCard).location(LocationType.PlayerHand).player(this.player)
  }

  get tableCards() {
    return this.material(MaterialType.NumberCard).location(LocationType.Table)
  }

  get cardsInPlay() {
    return this.material(MaterialType.NumberCard).location(LocationType.CardsInPlayLayout)
  }
}
