/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules.ts'
import { Colors } from '@gamepark/la-scopette/material/Colors.ts'
import { Symbols } from '@gamepark/la-scopette/material/Symbols.ts'
import { ScoreHelper } from '@gamepark/la-scopette/rules/helper/ScoreHelper.ts'
import { Picture, ScoringDescription } from '@gamepark/react-game'
import { getEnumValues } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import Green from '../images/Card/colors/ColorGreen.jpg'
import Orange from '../images/Card/colors/ColorOrange.jpg'
import Teal from '../images/Card/colors/ColorTeal.jpg'
import Pink from '../images/Card/colors/ColorPink.jpg'
import Purple from '../images/Card/colors/ColorPurple.jpg'
import Yellow from '../images/Card/colors/ColorYellow.jpg'
import Coin from '../images/Card/symbols/SymbolCoin.jpg'
import Die from '../images/Card/symbols/SymbolDie.jpg'
import Elephant from '../images/Card/symbols/SymbolElephant.jpg'
import Shamrock from '../images/Card/symbols/SymbolShamrock.jpg'
import ShootingStar from '../images/Card/symbols/SymbolShootingStar.jpg'
import HorseShoe from '../images/Card/symbols/SymbolHorseShoe.jpg'

enum ScoringKeys {
  Colors,
  Symbols,
  GoldenCards,
  Scopettes,
  Total
}

export class LaScopetteScoring implements ScoringDescription {
  getScoringKeys() {
    return getEnumValues(ScoringKeys)
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.Colors:
        return <Trans i18nKey="game-over.score.type.colors" />
      case ScoringKeys.Symbols:
        return <Trans i18nKey="game-over.score.type.symbols" />
      case ScoringKeys.GoldenCards:
        return <Trans i18nKey="game-over.score.type.golden-cards" />
      case ScoringKeys.Scopettes:
        return <Trans i18nKey="game-over.score.type.scopettes" />
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans i18nKey="game-over.score.type.total" />
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: number, rules: LaScopetteRules) {
    const scoreHelper = new ScoreHelper(rules.game)
    switch (key) {
      case ScoringKeys.Colors:
        return (
          <>
            {
              scoreHelper.getPlayerColor(player).map(color =>
                <>
                  <Trans
                    key={color}
                    i18nKey="game-over.score.points.colors"
                    components={{
                      color: <Picture src={this.getColorImage(color)} css={pictureCss} />,
                    }}
                    values={{
                      points: scoreHelper.getPlayerColorScore(player, color)
                    }}
                  />
                  <br />
                </>
              )
            }
          </>
        )
      case ScoringKeys.Symbols:
        return (
          <>
            {
              scoreHelper.getPlayerSymbols(player).map(symbol =>
                <>
                  <Trans
                    key={symbol}
                    i18nKey="game-over.score.points.symbols"
                    components={{
                      symbol: <Picture src={this.getSymbolImage(symbol)} css={pictureCss} />,
                    }}
                    values={{
                      points: scoreHelper.getPlayerSymbolScore(player, symbol)
                    }}
                  />
                  <br />
                </>
              )
            }
          </>
        )
      case ScoringKeys.GoldenCards:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getPlayerGoldCardsScore(player)
            }}
          />
        )
      case ScoringKeys.Scopettes:
        return (
          <Trans
            i18nKey="game-over.score.points"
            values={{
              points: scoreHelper.getPlayerScopetteTokens(player)
            }}
          />
        )
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans
              i18nKey="game-over.score.points"
              values={{
                points: scoreHelper.calculateScore(player)
              }}
            />
          </div>
        )
    }
  }

  getColorImage(color: Colors) {
    switch (color) {
      case Colors.Green:
        return Green
      case Colors.Orange:
        return Orange
      case Colors.Teal:
        return Teal
      case Colors.Pink:
        return Pink
      case Colors.Purple:
        return Purple
      case Colors.Yellow:
      default:
        return Yellow
    }
  }

  getSymbolImage(symbol: Symbols) {
    switch (symbol) {
      case Symbols.Coin:
        return Coin
      case Symbols.Die:
        return Die
      case Symbols.Elephant:
        return Elephant
      case Symbols.Shamrock:
        return Shamrock
      case Symbols.ShootingStar:
        return ShootingStar
      case Symbols.HorseShoe:
      default:
        return HorseShoe
    }
  }
}

const pictureCss = css`
  display: inline-block;
  vertical-align: sub;
  height: 1.3em;
`

const bold = css`
  font-weight: bold;
`