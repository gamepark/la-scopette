import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules.ts'
import { useRules } from '@gamepark/react-game'
import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'

export const StackSpotCounter = () => {
  const rules = useRules<LaScopetteRules>()!
  const count = rules.material(MaterialType.NumberCard).location(LocationType.Deck).length
  return <span>{count}</span>
}
