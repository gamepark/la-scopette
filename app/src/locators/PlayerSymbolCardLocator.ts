import { getRelativePlayerIndex, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class PlayerSymbolCardLocator extends Locator {

  getCoordinates(location: Location<number, number>, context: MaterialContext<number, number, number, number, number>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    switch (index) {
      case 0:
        if (context.rules.players.length === 2) return { x: -4, y: 26 }
        if (context.rules.players.length === 3) return { x: -40, y: 6 }
        if (context.rules.players.length === 4) return { x: -40, y: 6 }
        return { x: -65, y: 6 }
      case 1:
        if (context.rules.players.length === 2) return { x: 4, y: 26 }
        if (context.rules.players.length === 3) return { x: 40, y: -13 }
        if (context.rules.players.length === 4) return { x: 0, y: -13 }
        return { x: -40, y: -19 }
      case 2:
        if (context.rules.players.length === 3) return { x: 0, y: 26 }
        if (context.rules.players.length === 4) return { x: 40, y: 6 }
        return { x: 14, y: -19 }
      case 3:
        if (context.rules.players.length === 4) return { x: 0, y: 26 }
        return { x: 34, y: 6 }
      case 4:
        if (context.rules.players.length === 5) return { x: -10, y: 30 }
        return { x: 15, y: 30 }
      case 5:
      default:
        return { x: -35, y: 30 }
    }
  }
}

export const playerSymbolCardLocator = new PlayerSymbolCardLocator()