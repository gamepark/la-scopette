import { LaScopetteOptions } from '@gamepark/la-scopette/LaScopetteOptions'
import { LaScopetteSetup } from '@gamepark/la-scopette/LaScopetteSetup'
import { Colors } from '@gamepark/la-scopette/material/Colors'
import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { numberCards, Numbers } from '@gamepark/la-scopette/material/Numbers'
import { Symbols } from '@gamepark/la-scopette/material/Symbols'

export const me = 1
export const opponent = 2
export const opponent2 = 3
export const opponent3 = 4

// Tutorial card setup (4 players):
// P1 hand:  Green5(5), Teal9(9), Purple3(3)
// P2 hand:  Yellow8(8), OrangeMinus2(-2), PinkMinus2(-2)
// P3 hand:  Teal3(3), Yellow5(5), Purple4(4)
// P4 hand:  Orange6(6), Pink8(8), Green9(9)
// Table:    Green2(2), Teal5(5), Green7(7), Orange3(3)
// Draws (round 2, highest x drawn first): P1←Gold4, P2←Green1, P3←Purple2, P4←Teal6
// Round 1:
//   P1 plays Green5, captures Teal5 (5=5) → table: Green2, Green7, Orange3
//   P2 (Sofia) plays Yellow8, no capture   → table: Green2, Green7, Orange3, Yellow8
//   P3 (Carlos) plays Teal3, captures Orange3 (3=3) → table: Green2, Green7, Yellow8
//   P4 (Léa) plays Orange6, no capture (no 6 or combo=6 on table) → table: Green2, Green7, Yellow8, Orange6
// Round 2:
//   P1 plays Teal9, captures Green2+Green7 (2+7=9, only valid combo)
const p1Hand = [Numbers.Green5, Numbers.Teal9, Numbers.Purple3]
const p2Hand = [Numbers.Yellow8, Numbers.OrangeMinus2, Numbers.PinkMinus2]
const p3Hand = [Numbers.Teal3, Numbers.Yellow5, Numbers.Purple4]
const p4Hand = [Numbers.Orange6, Numbers.Pink8, Numbers.Green9]
const tableCards = [Numbers.Green2, Numbers.Teal5, Numbers.Green7, Numbers.Orange3]
const p1FirstDraw = Numbers.Gold4
const p2FirstDraw = Numbers.Green1
const p3FirstDraw = Numbers.Purple2
const p4FirstDraw = Numbers.Teal6

export class TutorialSetup extends LaScopetteSetup {
  setupMaterial(_options: LaScopetteOptions) {
    const scriptedSet = new Set([...p1Hand, ...p2Hand, ...p3Hand, ...p4Hand, ...tableCards, p1FirstDraw, p2FirstDraw, p3FirstDraw, p4FirstDraw])
    const fillerCards = numberCards.filter(n => !scriptedSet.has(n))

    // Create cards in order: deal order first, then filler, then draws (highest x drawn first)
    this.material(MaterialType.NumberCard).createItems(
      [...p1Hand, ...p2Hand, ...p3Hand, ...p4Hand, ...tableCards, ...fillerCards, p4FirstDraw, p3FirstDraw, p2FirstDraw, p1FirstDraw].map(id => ({
        id,
        location: { type: LocationType.Deck }
      }))
    )

    // Deal hands (limit takes lowest-x cards remaining in deck)
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: me })
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: opponent })
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: opponent2 })
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: opponent3 })

    // Deal table
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(4)
      .moveItems({ type: LocationType.Table })

    // Fixed color cards (1 per player for 4-player game)
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Green,
      location: { type: LocationType.PlayerColorCard, player: me }
    })
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Orange,
      location: { type: LocationType.PlayerColorCard, player: opponent }
    })
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Teal,
      location: { type: LocationType.PlayerColorCard, player: opponent2 }
    })
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Purple,
      location: { type: LocationType.PlayerColorCard, player: opponent3 }
    })

    // Fixed symbol cards (not shuffled)
    this.material(MaterialType.SymbolCard).createItem({
      id: Symbols.HorseShoe,
      location: { type: LocationType.PlayerSymbolCard, player: me }
    })
    this.material(MaterialType.SymbolCard).createItem({
      id: Symbols.Coin,
      location: { type: LocationType.PlayerSymbolCard, player: opponent }
    })
    this.material(MaterialType.SymbolCard).createItem({
      id: Symbols.Die,
      location: { type: LocationType.PlayerSymbolCard, player: opponent2 }
    })
    this.material(MaterialType.SymbolCard).createItem({
      id: Symbols.Shamrock,
      location: { type: LocationType.PlayerSymbolCard, player: opponent3 }
    })

    // Scopette tokens
    for (let i = 0; i < 24; i++) {
      this.material(MaterialType.ScopetteToken).createItem({
        location: { type: LocationType.ScopetteTokenStock }
      })
    }
  }
}
