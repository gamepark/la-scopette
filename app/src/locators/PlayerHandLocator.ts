import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

class PlayerHandLocator extends HandLocator {

  getCoordinates(location: Location, context: MaterialContext) {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        if (context.rules.players.length === 2) return { x: -28, y: 22 }
        if (context.rules.players.length === 3) return { x: -38, y: 22 }
        if (context.rules.players.length === 4) return { x: -38, y: 22 }
        return { x: -65, y: 30 }
      case 1:
        if (context.rules.players.length === 2) return { x: 24, y: 22 }
        if (context.rules.players.length === 3) return { x: -38, y: -13 }
        if (context.rules.players.length === 4) return { x: -38, y: -13 }
        return { x: -65, y: -19 }
      case 2:
        if (context.rules.players.length === 3) return { x: 34, y: 22 }
        if (context.rules.players.length === 4) return { x: 34, y: -13 }
        return { x: -14, y: -19 }
      case 3:
        if (context.rules.players.length === 4) return { x: 34, y: 22 }
        return { x: 34, y: -19 }
      case 4:
        return { x: 35, y: 30 }
      case 5:
      default:
        return { x: -14, y: 30 }
    }
  }

  getMaxAngle(location: Location, context: MaterialContext) {
    const playerIndex = getRelativePlayerIndex(context, location.player)
    return playerIndex === 0 ? 5 : 2
  }
}

export const playerHandLocator = new PlayerHandLocator()
