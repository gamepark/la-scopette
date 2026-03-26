import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { colorCardDescription } from './ColorCardDescription.ts'
import { numberCardDescription } from './NumberCardDescription.ts'
import { scopetteTokenDescription } from './ScopetteTokenDescription.ts'
import { symbolCardDescription } from './SymbolCardDescription.ts'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ColorCard]: colorCardDescription,
  [MaterialType.NumberCard]: numberCardDescription,
  [MaterialType.SymbolCard]: symbolCardDescription,
  [MaterialType.ScopetteToken]: scopetteTokenDescription
}
