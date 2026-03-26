import {
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
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class LaScopetteRules
  extends SecretMaterialRules<number, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<number, MaterialType, LocationType>, MaterialMove<number, MaterialType, LocationType>, number>
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.NumberCard]: {
      [LocationType.Deck]: new PositiveSequenceStrategy(),
      [LocationType.Table]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy()
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
}
