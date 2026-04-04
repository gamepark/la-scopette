import { MoveComponentProps } from '@gamepark/react-game'
import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const ScopetteLog: FC<MoveComponentProps<MaterialMove>> = ({ move }) => {
  const count = (move as MoveItem).quantity ?? 1

  return (
    <Trans
      i18nKey="log.scopette"
      values={{ count }}
    />
  )
}
