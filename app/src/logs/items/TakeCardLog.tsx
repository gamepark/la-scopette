import { MaterialLogProps, PlayMoveButton, usePlayerName } from '@gamepark/react-game'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { numberCardData, Numbers } from '@gamepark/la-scopette/material/Numbers'
import { MaterialGame, MaterialMoveBuilder, MoveItem } from '@gamepark/rules-api'
import { merge } from 'es-toolkit'
import { Trans } from 'react-i18next'
import displayMaterialHelp = MaterialMoveBuilder.displayMaterialHelp

export const TakeCardLog = ({ move, context }: MaterialLogProps<MoveItem>) => {
  const rules = new LaScopetteRules(context.game as MaterialGame)
  const card = rules.material(MaterialType.NumberCard).getItem(move.itemIndex)
  if (move.reveal) {
    merge(card, move.reveal)
  }
  const cardData = numberCardData[card.id as Numbers]
  const playerName = usePlayerName(rules.getActivePlayer())

  return (
    <Trans
      i18nKey="log.take-card"
      values={{ player: playerName, color: cardData.color, number: cardData.number }}
      components={{
        numberCard: <PlayMoveButton move={displayMaterialHelp(MaterialType.NumberCard, card)} transient />
      }}
    />
  )
}
