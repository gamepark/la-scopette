import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules'
import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { CustomMoveType } from '@gamepark/la-scopette/rules/CustomMoveType'
import { isCustomMoveType, isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { DontTakeCardsLog } from './items/DontTakeCardsLog'
import { PassLog } from './items/PassLog'
import { PlayCardLog } from './items/PlayCardLog'
import { ScopetteLog } from './items/ScopetteLog'
import { TakeCardLog } from './items/TakeCardLog'

export class LaScopetteLogDescription implements LogDescription<MaterialMove, number, MaterialGame> {
  getMovePlayedLogDescription(move: MaterialMove, context: MoveComponentContext<MaterialMove, number, MaterialGame>): MovePlayedLogDescription | undefined {
    const player = context.game.rule?.player

    // Main: player plays a card from hand
    if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.CardsInPlayLayout) {
      return { player, Component: PlayCardLog }
    }

    // Sub: player captures a table card (not the played card going to stock automatically)
    if (isMoveItemType(MaterialType.NumberCard)(move) && move.location.type === LocationType.PlayerNumberCardsTakenStock) {
      const rules = new LaScopetteRules(context.game as MaterialGame)
      const item = rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
      if (item.location.type === LocationType.Table) {
        return { depth: 1, Component: TakeCardLog }
      }
      return undefined
    }

    // Sub: player couldn't/chose not to capture
    if (isCustomMoveType(CustomMoveType.DontTakeCards)(move)) {
      return { depth: 1, Component: DontTakeCardsLog }
    }

    // Main: player passes their turn
    if (isCustomMoveType(CustomMoveType.Pass)(move)) {
      return { player, Component: PassLog }
    }

    // Sub: scopette token(s) earned
    if (isMoveItemType(MaterialType.ScopetteToken)(move) && move.location.type === LocationType.PlayerScopetteTokenStock) {
      return { depth: 1, Component: ScopetteLog }
    }

    return undefined
  }
}
