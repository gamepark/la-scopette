import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

const BOTTOM_LEFT = { x: -38, y: 22 }
const BOTTOM_RIGHT = { x: 38, y: 22 }
const TOP_LEFT = { x: -38, y: -22 }
const TOP_RIGHT = { x: 38, y: -22 }
const TOP_CENTER = { x: 0, y: -22 }
const BOTTOM_CENTER = { x: 0, y: 22 }

class PlayerHandLocator extends HandLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        return BOTTOM_LEFT
      case 1:
        if (context.rules.players.length === 2) return BOTTOM_RIGHT
        return TOP_LEFT
      case 2:
        if (context.rules.players.length === 3) return BOTTOM_RIGHT
        if (context.rules.players.length === 4) return TOP_RIGHT
        return TOP_CENTER
      case 3:
        if (context.rules.players.length === 4) return BOTTOM_RIGHT
        return TOP_RIGHT
      case 4:
        return BOTTOM_RIGHT
      case 5:
      default:
        return BOTTOM_CENTER
    }
  }

  getMaxAngle(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? 10 : 2
  }
}

export const playerHandLocator = new PlayerHandLocator()
