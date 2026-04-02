import { MoveComponentProps } from '@gamepark/react-game'
import { MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const ScopetteLog: FC<MoveComponentProps<MaterialMove>> = ({ move }) => {
  const count = (move as MoveItem).quantity ?? 1
  const tokenWord = count === 1 ? 'jeton' : 'jetons'

  return (
    <Trans
      i18nKey="log.scopette"
      defaults="a gagné {{count}} {{tokenWord}} Scopette !"
      values={{ count, tokenWord }}
    />
  )
}
