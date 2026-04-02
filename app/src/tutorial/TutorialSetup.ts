import { LaScopetteOptions } from '@gamepark/la-scopette/LaScopetteOptions'
import { LaScopetteSetup } from '@gamepark/la-scopette/LaScopetteSetup'
import { Colors } from '@gamepark/la-scopette/material/Colors'
import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { numberCards, Numbers } from '@gamepark/la-scopette/material/Numbers'
import { Symbols } from '@gamepark/la-scopette/material/Symbols'

export const me = 1
export const opponent = 2

// Tutorial card setup:
// P1 hand:  Green5(Green,Coin,5), Teal9(Teal,HorseShoe,9), Purple3
// P2 hand:  Yellow8(Yellow,Coin,8), OrangeMinus2, PinkMinus2
// Table:    Green2(Green,Shamrock,2), Teal5(Teal,HorseShoe,5), Green7(Green,HorseShoe,7), Orange3
// P1 draws: Gold4 (top of deck, highest x)
// P2 draws: Green1 (second from top)
// Turn 1: P1 plays Green5, captures Teal5 (5=5) → stock: Green5(Green,Coin) + Teal5(HorseShoe) ✓
// Turn 2: P1 plays Teal9, captures Green2+Green7 (2+7=9) → stock: Teal9(HorseShoe) + Green2(Green) + Green7(Green,HorseShoe) ✓
// Sofia plays Yellow8 (value=8), can't capture [Green2,Green7,Orange3] ✓
const p1Hand = [Numbers.Green5, Numbers.Teal9, Numbers.Purple3]
const p2Hand = [Numbers.Yellow8, Numbers.OrangeMinus2, Numbers.PinkMinus2]
const tableCards = [Numbers.Green2, Numbers.Teal5, Numbers.Green7, Numbers.Orange3]
const p1FirstDraw = Numbers.Gold4
const p2FirstDraw = Numbers.Green1

export class TutorialSetup extends LaScopetteSetup {
  setupMaterial(_options: LaScopetteOptions) {
    const scriptedSet = new Set([...p1Hand, ...p2Hand, ...tableCards, p1FirstDraw, p2FirstDraw])
    const fillerCards = numberCards.filter(n => !scriptedSet.has(n))

    // Create cards in order: deal order first, then filler, then draws (highest x drawn first)
    this.material(MaterialType.NumberCard).createItems(
      [...p1Hand, ...p2Hand, ...tableCards, ...fillerCards, p2FirstDraw, p1FirstDraw].map(id => ({
        id,
        location: { type: LocationType.Deck }
      }))
    )

    // Deal hands (limit takes lowest-x cards remaining in deck)
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: me })
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(3)
      .moveItems({ type: LocationType.PlayerHand, player: opponent })

    // Deal table
    this.material(MaterialType.NumberCard).location(LocationType.Deck).limit(4)
      .moveItems({ type: LocationType.Table })

    // Fixed color cards (not shuffled)
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Green,
      location: { type: LocationType.PlayerColorCard, player: me }
    })
    this.material(MaterialType.ColorCard).createItem({
      id: Colors.Orange,
      location: { type: LocationType.PlayerColorCard, player: opponent }
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

    // Scopette tokens
    for (let i = 0; i < 24; i++) {
      this.material(MaterialType.ScopetteToken).createItem({
        location: { type: LocationType.ScopetteTokenStock }
      })
    }
  }
}
