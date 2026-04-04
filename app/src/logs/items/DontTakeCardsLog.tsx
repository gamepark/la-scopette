import { MoveComponentProps } from '@gamepark/react-game'
import { MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const DontTakeCardsLog: FC<MoveComponentProps<MaterialMove>> = () => {
  return (
    <Trans
      i18nKey="log.dont-take-cards"
    />
  )
}
