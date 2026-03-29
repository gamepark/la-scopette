import { RuleId } from '@gamepark/la-scopette/rules/RuleId'
import { ComponentType } from 'react'
import { CheckScopettesHeader } from './CheckScopettesHeader.tsx'
import { DrawCardHeader } from './DrawCardHeader.tsx'
import { PlayCardHeader } from './PlayCardHeader.tsx'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.CheckScopettes]: CheckScopettesHeader,
  [RuleId.DrawCard]: DrawCardHeader
}
