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
          <Trans i18nKey="tuto.welcome"
            defaults="Bienvenue dans <bold>La Scopette</bold> ! Vous allez apprendre à jouer contre Sofia. Le but : capturer des cartes de la table pour marquer des points selon vos objectifs." components={Bold} />
        )
      }
    },

    // Étape 1 — Présentation des objectifs (couleur secrète + symboles visibles)
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.1"
            defaults="Voici vos objectifs ! Votre carte <bold>Couleur</bold> est secrète : vous seul·e savez que vous jouez le Vert. En revanche, les cartes <bold>Symbole</bold> autour de vous sont <bold>visibles de tous</bold> : elles indiquent les symboles à collectionner." components={Bold} />
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
          <Trans i18nKey="tuto.step.2"
            defaults="Ces cartes Nombre sont sur la table. Si la valeur de votre carte est égale à une carte de la table, ou au <bold>total de plusieurs cartes</bold> de la table, vous les capturez ! Jouez votre <bold>Vert 5</bold> pour capturer la <bold>Bleu-vert 5</bold>." components={Bold} />
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
          <Trans i18nKey="tuto.step.3"
            defaults="Votre <bold>Vert 5</bold> est en jeu ! Cliquez maintenant sur la <bold>Bleu-vert 5</bold> de la table — même valeur — pour la capturer." components={Bold} />
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
          <Trans i18nKey="tuto.step.6"
            defaults="À la fin de chaque tour, vous piochez 1 carte. Sofia n'a pas pu capturer et a dû <bold>poser sa carte sur la table sans prendre</bold>. À votre tour ! Jouez votre <bold>Bleu-vert 9</bold>." components={Bold} />
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
          <Trans i18nKey="tuto.step.7"
            defaults="Vous pouvez capturer plusieurs cartes dont le <bold>total est égal</bold> à votre carte jouée. 2 + 7 = 9 ! Prenez d'abord la <bold>Vert 2</bold>." components={Bold} />
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
          <Trans i18nKey="tuto.step.9"
            defaults="Jeton Scopette ! Quand vous capturez la <bold>dernière carte de la table</bold>, ou jouez votre <bold>dernière carte en main</bold>, vous gagnez 1 jeton (1 point). Si les deux arrivent en même temps : <bold>4 jetons</bold> !" components={Bold} />
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
          <Trans i18nKey="tuto.step.10"
            defaults="En fin de partie : <bold>1 point</bold> par carte de votre couleur secrète, <bold>1 point</bold> par carte portant l'un des symboles des cartes qui vous <bold>entourent</bold> (visibles de tous !), <bold>1 point</bold> par carte Or (valeur 1, 4, 7 ou 10)." components={Bold} />
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
          <Trans i18nKey="tuto.step.11"
            defaults="Vous pouvez aussi jouer <bold>plusieurs cartes de votre main</bold> pour capturer une seule carte de la table dont la valeur est égale à leur total. Si vous avez moins de 3 cartes, vous pouvez <bold>passer votre tour</bold>. À vous de jouer !" components={Bold} />
        )
      }
    },

    // Étape 12 — Fin de partie
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.step.12"
                 defaults="La partie se termine quand la <bold>pioche est vide</bold>. Chaque joueur joue alors une <bold>dernière fois sans piocher</bold> — y compris celui qui a pris la dernière carte du deck." components={Bold} />
        )
      }
    },
  ]
}
