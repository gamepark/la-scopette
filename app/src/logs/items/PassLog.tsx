import { MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules'
import { MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const PassLog: FC<MoveComponentProps<MaterialMove>> = ({ context }) => {
  const rules = new LaScopetteRules(context.game as MaterialGame)
  const playerName = usePlayerName(rules.getActivePlayer())

  return (
    <Trans
      i18nKey="log.pass"
      defaults="{{player}} a passé son tour"
      values={{ player: playerName }}
    />
  )
}
