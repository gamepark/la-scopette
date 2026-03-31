import {
  CompetitiveScore,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { CheckScopettesRule } from './rules/CheckScopettesRule'
import { DrawCardRule } from './rules/DrawCardRule'
import { ScoreHelper } from './rules/helper/ScoreHelper'
import { PlayCardRule } from './rules/PlayCardRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LaScopetteRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame, MaterialMove, number>, CompetitiveScore<MaterialGame, MaterialMove, number>
{
  scoreHelper = new ScoreHelper(this.game)
  rankByLowerScore?: boolean | undefined
  rules = {
    [RuleId.PlayCard]: PlayCardRule,
    [RuleId.CheckScopettes]: CheckScopettesRule,
    [RuleId.DrawCard]: DrawCardRule,
  }

  locationsStrategies = {
    [MaterialType.NumberCard]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Table]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.CardsInPlayLayout]: new PositiveSequenceStrategy()
    },
    [MaterialType.ColorCard]: {
      [LocationType.PlayerColorCard]: new PositiveSequenceStrategy()
    }
  }

  hidingStrategies = {
  [MaterialType.NumberCard]: {
    [LocationType.Deck]: hideItemId,
    [LocationType.PlayerHand]: hideItemIdToOthers
  },
  [MaterialType.ColorCard]: {
    [LocationType.PlayerColorCard]: hideItemIdToOthers
  }
}

  giveTime(): number {
    return 60
  }
  getScore(playerId: number): number {
    return this.scoreHelper.calculateScore(playerId)
  }

  getTieBreaker?(tieBreaker: number, playerId: number): number | undefined {
    if (tieBreaker === 1) {
      return this.scoreHelper.getPlayerTakenCards(playerId).length
    }
    if (tieBreaker === 2) {
      return this.scoreHelper.getPlayerScopetteTokens(playerId)
    }
    return undefined
  }
}
