import { isCustomMoveType, isMoveItem, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { describe, expect, test } from 'vitest'
import { LaScopetteRules } from '../LaScopetteRules'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Numbers } from '../material/Numbers'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

const PLAYER = 1

function createGame({
  hand = [],
  table = [],
  cardsInPlay = [],
  sum,
}: {
  hand?: Numbers[]
  table?: Numbers[]
  cardsInPlay?: Numbers[]
  sum?: number
} = {}): MaterialGame {
  return {
    players: [1, 2],
    items: {
      [MaterialType.NumberCard]: [
        ...hand.map(id => ({ id, location: { type: LocationType.PlayerHand, player: PLAYER } })),
        ...table.map(id => ({ id, location: { type: LocationType.Table } })),
        ...cardsInPlay.map(id => ({ id, location: { type: LocationType.CardsInPlayLayout } })),
      ],
    },
    rule: { id: RuleId.PlayCard, player: PLAYER },
    memory: sum !== undefined ? { [Memory.Sum]: sum } : {},
  }
}

function getLegalMoves(game: MaterialGame): MaterialMove[] {
  return new LaScopetteRules(game).getLegalMoves(PLAYER)
}

function playableCards(game: MaterialGame, moves: MaterialMove[]): Numbers[] {
  return moves
    .filter(m => isMoveItem(m) && m.location.type === LocationType.CardsInPlayLayout)
    .map(m => game.items[MaterialType.NumberCard]![m.itemIndex].id as Numbers)
}

function capturableCards(game: MaterialGame, moves: MaterialMove[]): Numbers[] {
  return moves
    .filter(m => isMoveItem(m) && m.location.type === LocationType.PlayerNumberCardsTakenStock)
    .map(m => game.items[MaterialType.NumberCard]![m.itemIndex].id as Numbers)
}

function hasPass(moves: MaterialMove[]): boolean {
  return moves.some(m => isCustomMoveType(CustomMoveType.Pass)(m))
}

function hasDontTakeCards(moves: MaterialMove[]): boolean {
  return moves.some(m => isCustomMoveType(CustomMoveType.DontTakeCards)(m))
}

describe('PlayCardRule', () => {
  describe('Aucune carte en jeu', () => {
    test('toutes les cartes en main sont jouables quand aucune carte en jeu', () => {
      // main: [4, 2, -2], table: [4]
      const game = createGame({
        hand: [Numbers.Green4, Numbers.Orange2, Numbers.OrangeMinus2],
        table: [Numbers.Yellow4],
      })
      const moves = getLegalMoves(game)
      const playable = playableCards(game, moves)
      expect(playable).toContain(Numbers.Green4)
      expect(playable).toContain(Numbers.Orange2)
      expect(playable).toContain(Numbers.OrangeMinus2)
    })

    test('pass non proposé quand 3 cartes en main', () => {
      const game = createGame({
        hand: [Numbers.Green4, Numbers.Orange2, Numbers.OrangeMinus2],
        table: [Numbers.Yellow4],
      })
      expect(hasPass(getLegalMoves(game))).toBe(false)
    })

    test('pass proposé quand moins de 3 cartes en main', () => {
      const game = createGame({
        hand: [Numbers.Green4, Numbers.Orange2],
        table: [Numbers.Yellow4],
      })
      expect(hasPass(getLegalMoves(game))).toBe(true)
    })
  })

  describe('Une seule carte en jeu', () => {
    test('DontTakeCards proposé quand 1 carte en jeu (Memory.Sum = 0)', () => {
      const game = createGame({
        hand: [Numbers.Orange2],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.Green4],
      })
      expect(hasDontTakeCards(getLegalMoves(game))).toBe(true)
    })

    test('DontTakeCards non proposé quand Memory.Sum > 0 (capture incrémentale en cours)', () => {
      // cardsInPlay=[7], déjà pris une carte de valeur 3 → sum=3
      const game = createGame({
        hand: [],
        table: [Numbers.Orange4],
        cardsInPlay: [Numbers.Green7],
        sum: 3,
      })
      expect(hasDontTakeCards(getLegalMoves(game))).toBe(false)
    })

    test('peut capturer une seule carte table correspondante', () => {
      // cardsInPlay=[4], table=[4]
      const game = createGame({
        hand: [Numbers.Orange2],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.Green4],
      })
      const moves = getLegalMoves(game)
      expect(capturableCards(game, moves)).toContain(Numbers.Yellow4)
    })

    test('peut capturer plusieurs cartes table par subset sum', () => {
      // cardsInPlay=[7], table=[3, 4] → 3+4=7
      const game = createGame({
        hand: [],
        table: [Numbers.Yellow3, Numbers.Teal4],
        cardsInPlay: [Numbers.Green7],
      })
      const moves = getLegalMoves(game)
      const capturable = capturableCards(game, moves)
      expect(capturable).toContain(Numbers.Yellow3)
      expect(capturable).toContain(Numbers.Teal4)
    })

    test('peut jouer une carte supplémentaire si nécessaire pour capturer', () => {
      // cardsInPlay=[4], table=[9], main=[5] → 4+5=9
      const game = createGame({
        hand: [Numbers.Green5],
        table: [Numbers.Yellow9],
        cardsInPlay: [Numbers.Orange4],
      })
      expect(playableCards(game, getLegalMoves(game))).toContain(Numbers.Green5)
    })

    test('ne peut pas jouer une carte qui ne mène à aucune capture', () => {
      // cardsInPlay=[4], table=[9], main=[3] → 4+3=7, pas de 7 en table
      const game = createGame({
        hand: [Numbers.Green3],
        table: [Numbers.Yellow9],
        cardsInPlay: [Numbers.Orange4],
      })
      expect(playableCards(game, getLegalMoves(game))).not.toContain(Numbers.Green3)
    })

    test('[Bug 1] après avoir joué 4, peut jouer 2 et -2 pour capturer le 4 en table', () => {
      // cardsInPlay=[4], table=[4], main=[2, -2] → 4+2+(-2)=4 capture table[4]
      const game = createGame({
        hand: [Numbers.Orange2, Numbers.OrangeMinus2],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.Green4],
      })
      const playable = playableCards(game, getLegalMoves(game))
      expect(playable).toContain(Numbers.Orange2)
      expect(playable).toContain(Numbers.OrangeMinus2)
    })

    test('[Bug 2] ne peut pas jouer 2 et -2 si une capture est déjà possible par subset sum', () => {
      // cardsInPlay=[10], table=[6, 4, 3], main=[2, -2] → 6+4=10 déjà capturable
      const game = createGame({
        hand: [Numbers.Orange2, Numbers.OrangeMinus2],
        table: [Numbers.Teal6, Numbers.Yellow4, Numbers.Yellow3],
        cardsInPlay: [Numbers.Green10],
      })
      const playable = playableCards(game, getLegalMoves(game))
      expect(playable).not.toContain(Numbers.Orange2)
      expect(playable).not.toContain(Numbers.OrangeMinus2)
    })

    test('[Bug 2] la capture par subset sum reste bien proposée', () => {
      // cardsInPlay=[10], table=[6, 4, 3] → 6+4=10
      const game = createGame({
        hand: [Numbers.Orange2, Numbers.OrangeMinus2],
        table: [Numbers.Teal6, Numbers.Yellow4, Numbers.Yellow3],
        cardsInPlay: [Numbers.Green10],
      })
      const capturable = capturableCards(game, getLegalMoves(game))
      expect(capturable).toContain(Numbers.Teal6)
      expect(capturable).toContain(Numbers.Yellow4)
    })

    test('indépendance d\'ordre : jouer 2 en premier → 4 et -2 jouables', () => {
      // cardsInPlay=[2], table=[4], main=[4, -2] → 2+4+(-2)=4 capture table[4]
      const game = createGame({
        hand: [Numbers.Green4, Numbers.PinkMinus2],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.Orange2],
      })
      const playable = playableCards(game, getLegalMoves(game))
      expect(playable).toContain(Numbers.Green4)
      expect(playable).toContain(Numbers.PinkMinus2)
    })

    test('indépendance d\'ordre : jouer -2 en premier → 4 et 2 jouables', () => {
      // cardsInPlay=[-2], table=[4], main=[4, 2] → -2+4+2=4 capture table[4]
      const game = createGame({
        hand: [Numbers.Green4, Numbers.Pink2],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.OrangeMinus2],
      })
      const playable = playableCards(game, getLegalMoves(game))
      expect(playable).toContain(Numbers.Green4)
      expect(playable).toContain(Numbers.Pink2)
    })

    test('capture incrémentale : peut prendre la carte restante pour compléter la somme', () => {
      // cardsInPlay=[7], table=[4], sum=3 → cible restante = 7-3 = 4
      const game = createGame({
        hand: [],
        table: [Numbers.Orange4],
        cardsInPlay: [Numbers.Green7],
        sum: 3,
      })
      expect(capturableCards(game, getLegalMoves(game))).toContain(Numbers.Orange4)
    })
  })

  describe('Plusieurs cartes en jeu', () => {
    test('peut capturer une seule carte table (correspondance exacte)', () => {
      // cardsInPlay=[4, 2, -2] total=4, table=[4]
      const game = createGame({
        hand: [],
        table: [Numbers.Yellow4],
        cardsInPlay: [Numbers.Green4, Numbers.Orange2, Numbers.PinkMinus2],
      })
      expect(capturableCards(game, getLegalMoves(game))).toContain(Numbers.Yellow4)
    })

    test('ne peut pas capturer par subset sum quand plusieurs cartes en jeu', () => {
      // cardsInPlay=[4, 2, -2] total=4, table=[1, 3] → 1+3=4 mais pas de carte unique = 4
      const game = createGame({
        hand: [],
        table: [Numbers.Yellow1, Numbers.Teal3],
        cardsInPlay: [Numbers.Green4, Numbers.Orange2, Numbers.PinkMinus2],
      })
      const capturable = capturableCards(game, getLegalMoves(game))
      expect(capturable).not.toContain(Numbers.Yellow1)
      expect(capturable).not.toContain(Numbers.Teal3)
    })

    test('peut jouer une carte supplémentaire si elle permet la capture', () => {
      // cardsInPlay=[4, 2] total=6, table=[9], main=[3] → 6+3=9
      const game = createGame({
        hand: [Numbers.Green3],
        table: [Numbers.Yellow9],
        cardsInPlay: [Numbers.Orange4, Numbers.Purple2],
      })
      expect(playableCards(game, getLegalMoves(game))).toContain(Numbers.Green3)
    })

    test('ne peut pas jouer une carte supplémentaire qui ne mène à aucune capture', () => {
      // cardsInPlay=[4, 2] total=6, table=[8], main=[3] → 6+3=9, pas de 9 en table
      const game = createGame({
        hand: [Numbers.Green3],
        table: [Numbers.Yellow8],
        cardsInPlay: [Numbers.Orange4, Numbers.Purple2],
      })
      expect(playableCards(game, getLegalMoves(game))).not.toContain(Numbers.Green3)
    })
  })
})
