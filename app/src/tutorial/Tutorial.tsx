/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/la-scopette/material/LocationType'
import { MaterialType } from '@gamepark/la-scopette/material/MaterialType'
import { Numbers } from '@gamepark/la-scopette/material/Numbers'
import { CustomMoveType } from '@gamepark/la-scopette/rules/CustomMoveType'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isCustomMoveType, isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { me, opponent, TutorialSetup } from './TutorialSetup'

const Bold = { bold: <strong /> }

export class Tutorial extends MaterialTutorial<number, MaterialType, LocationType> {
  version = 1
  options = { players: [{ id: me }, { id: opponent }] }
  setup = new TutorialSetup()

  players = [
    { id: me },
    {
      id: opponent,
      name: 'Sofia',
      avatar: {
        topType: 'LongHairStraight',
        accessoriesType: 'Blank',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        clotheType: 'BlazerShirt',
        clotheColor: 'PastelRed',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light'
      }
    }
  ]

  steps: TutorialStep<number, MaterialType, LocationType>[] = [
    // Étape 0 — Modal de bienvenue
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.welcome" components={Bold} />
        )
      }
    },

    // Étape 1 — Présentation des objectifs (couleur secrète + symboles visibles)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.1" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ColorCard).location(LocationType.PlayerColorCard).player(me),
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(me),
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(opponent)
        ]
      })
    },

    // Étape 2 — Explication capture + jouer Vert 5
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.2" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.Table),
          this.material(game, MaterialType.NumberCard).id(Numbers.Green5)
        ],
        margin: { bottom: 5 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.CardsInPlayLayout &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Green5
      }
    },

    // Étape 3 — Prendre la Bleu-vert 5
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.3" components={Bold} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardsInPlayLayout),
          this.material(game, MaterialType.NumberCard).id(Numbers.Teal5)
        ]
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.PlayerNumberCardsTakenStock &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Teal5
      }
    },

    // Étapes 4 & 5 — Tour de Sofia (bot, sans popup)
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.CardsInPlayLayout &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Yellow8
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isCustomMoveType(CustomMoveType.DontTakeCards)(move)
      }
    },

    // Étape 6 — Explication pioche + poser sans prendre + jouer Bleu-vert 9
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.6" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.PlayerHand).player(me),
          this.material(game, MaterialType.NumberCard).location(LocationType.Table)
        ],
        margin: { bottom: 5 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.CardsInPlayLayout &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Teal9
      }
    },

    // Étape 7 — Prendre Vert 2 (première carte du total 9)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.7" components={Bold} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardsInPlayLayout),
          this.material(game, MaterialType.NumberCard).id(Numbers.Green2),
          this.material(game, MaterialType.NumberCard).id(Numbers.Green7)
        ]
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.PlayerNumberCardsTakenStock &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Green2
      }
    },

    // Étape 8 — Prendre Vert 7 (seul coup légal restant, pas de popup)
    {
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.PlayerNumberCardsTakenStock &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Green7
      }
    },

    // Étape 9 — Explication jeton Scopette
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.9" components={Bold} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ScopetteToken).location(LocationType.ScopetteTokenStock),
          this.material(game, MaterialType.ScopetteToken).location(LocationType.PlayerScopetteTokenStock).player(me)
        ]
      })
    },

    // Étape 10 — Explication du score
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.10" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ColorCard).location(LocationType.PlayerColorCard).player(me),
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(me),
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(opponent)
        ]
      })
    },

    // Étape 11 — Actions restantes + jeu libre
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.11" components={Bold} />
        )
      }
    },

    // Étape 12 — Fin de partie
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.12" components={Bold} />
        )
      }
    },
  ]
}
