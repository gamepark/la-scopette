import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules.ts'
import { CustomMoveType } from '@gamepark/la-scopette/rules/CustomMoveType.ts'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayCardHeader = () => {
  const player = usePlayerId()
  const rules = useRules<LaScopetteRules>()!
  const activePlayer = rules.game.rule?.player
  const itsMe = player && activePlayer === player
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const dontTakeCards = useLegalMove(isCustomMoveType(CustomMoveType.DontTakeCards))
  const name = usePlayerName(activePlayer)

  if (itsMe) {
    if(pass) {
      return <Trans
        i18nKey="header.play-card.you.pass"
        components={{
          pass: <PlayMoveButton move={pass}/>
        }}
      />
    }
    if(dontTakeCards) {
      return <Trans
        i18nKey="header.play-card.you.dont-take-cards"
        components={{
          dontTakeCards: <PlayMoveButton move={dontTakeCards}/>
        }}
      />
    }
    return <Trans
      i18nKey="header.play-card.you"
    />
  }

  return <Trans
    i18nKey="header.play-card.player"
    values={{ player: name }}
  />
}
