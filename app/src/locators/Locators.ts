import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { Locator } from '@gamepark/react-game'
import { cardsInPlayLayoutLocator } from './CardsInPlayLayoutLocator.ts'
import { numberCardDeckLocator } from './NumberCardDeckLocator.ts'
import { numberCardsTableLocator } from './NumberCardsTableLocator.ts'
import { playerColorCardLocator } from './PlayerColorCardLocator.ts'
import { playerHandLocator } from './PlayerHandLocator.ts'
import { playerNumberCardsTakenStockLocator } from './PlayerNumberCardsTakenStockLocator.ts'
import { playerScopetteTokenStockLocator } from './PlayerScopetteTokenStockLocator.ts'
import { playerSymbolCardLocator } from './PlayerSymbolCardLocator.ts'
import { scopetteTokenStockLocator } from './ScopetteTokenStockLocator.ts'

export const Locators: Partial<Record<LocationType, Locator<number, MaterialType, LocationType>>> = {
  [LocationType.Deck]: numberCardDeckLocator,
  [LocationType.Table]: numberCardsTableLocator,
  [LocationType.ScopetteTokenStock]: scopetteTokenStockLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerColorCard]: playerColorCardLocator,
  [LocationType.PlayerSymbolCard]: playerSymbolCardLocator,
  [LocationType.PlayerScopetteTokenStock]: playerScopetteTokenStockLocator,
  [LocationType.PlayerNumberCardsTakenStock]: playerNumberCardsTakenStockLocator,
  [LocationType.CardsInPlayLayout]: cardsInPlayLayoutLocator,
}
