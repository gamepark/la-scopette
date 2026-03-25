import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { PlayerColor } from '@gamepark/la-scopette/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
