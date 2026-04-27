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

    // Étape 1 — Cartes Couleur (secrètes + scoring couleur)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.1" components={Bold} />
        ),
        position: { y: 25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ColorCard).location(LocationType.PlayerColorCard).player(me)
        ],
        margin: { bottom: 8, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 1b — Cartes Symbole (visibles + scoring symboles)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.1b" components={Bold} />
        ),
        position: { y: -25 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(me),
          this.material(game, MaterialType.SymbolCard).location(LocationType.PlayerSymbolCard).player(opponent)
        ],
        margin: { bottom: 10, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 2 — Capture valeur égale + jouer Vert 5
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
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
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
        ],
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.PlayerNumberCardsTakenStock &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Teal5
      }
    },

    // Étape 3b — Explication pioche (move automatique)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.3b" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.Deck)
        ],
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
      })
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

    // Étape 6a — Sofia a posé sans prendre
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.6a" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.CardsInPlayLayout)
        ],
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 6b — Pioche + jouer Bleu-vert 9
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.6b" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).location(LocationType.PlayerHand).player(me),
          this.material(game, MaterialType.NumberCard).location(LocationType.Table)
        ],
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.NumberCard)(move) &&
          move.location.type === LocationType.CardsInPlayLayout &&
          game.items[MaterialType.NumberCard]?.[move.itemIndex]?.id === Numbers.Teal9
      }
    },

    // Étape 7 — Capture par total + prendre Vert 2
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
        ],
        margin: { bottom: 5, top: 5, left: 5, right: 5 }
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

    // Étape 9a — Scopette : capturer la dernière carte de la table
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.9a" components={Bold} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ScopetteToken).location(LocationType.ScopetteTokenStock)
        ],
        margin: { bottom: 8, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 9b — Grand Scopette (4 jetons si les deux conditions simultanées)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.9b" components={Bold} />
        ),
        position: { y: 20 }
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.ScopetteToken).location(LocationType.ScopetteTokenStock)
        ],
        margin: { bottom: 8, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 10 — Cartes Or
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.10" components={Bold} />
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.NumberCard).id(Numbers.Gold4)
        ],
        margin: { bottom: 8, top: 5, left: 5, right: 5 }
      })
    },

    // Étape 11a — Jouer plusieurs cartes de main pour capturer 1 carte
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.11a" components={Bold} />
        )
      }
    },

    // Étape 11b — Passer son tour + jeu libre
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.11b" components={Bold} />
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
