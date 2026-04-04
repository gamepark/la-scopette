import { css } from '@emotion/react'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules.ts'
import { Colors } from '@gamepark/la-scopette/material/Colors.ts'
import { Symbols } from '@gamepark/la-scopette/material/Symbols.ts'
import { ScoreHelper } from '@gamepark/la-scopette/rules/helper/ScoreHelper.ts'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { createPortal } from 'react-dom'
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
import Scopette from '../images/token/ScopetteTokenFront.jpg'
import Golden from '../images/golden.jpg'
import Panel1 from '../images/panels/panel1.jpg'
import Panel2 from '../images/panels/panel2.jpg'
import Panel3 from '../images/panels/panel3.jpg'
import Panel4 from '../images/panels/panel4.jpg'
import Panel5 from '../images/panels/panel5.jpg'
import Panel6 from '../images/panels/panel6.jpg'

export const PlayerPanels = () => {
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  const rules = useRules<LaScopetteRules>()
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          counters={getCounters(player.id, index, rules?.game)}
          countersPerLine={6}
          css={panelPosition(index, players.length)}
          activeRing
          backgroundImage={images[player.id]}
        />
      ))}
    </>,
    root
  )
}

const getCounters = (playerId: number, index: number, game?: MaterialGame) => {
  if(!game) return []
  const scoreHelper = new ScoreHelper(game)
  const counters = []
  if(index === 0) {
    const colors = scoreHelper.getPlayerColor(playerId)
    for(const color of colors) {
      counters.push({
        image: getColorImage(color),
        value: scoreHelper.getPlayerColorScore(playerId, color)
      })
    }
  }
  const symbols = scoreHelper.getPlayerSymbols(playerId)
  for(const symbol of symbols) {
    counters.push({
      image: getSymbolImage(symbol),
      value: scoreHelper.getPlayerSymbolScore(playerId, symbol)
    })
  }
  counters.push({
    image: Scopette,
    value: scoreHelper.getPlayerScopetteTokens(playerId)
  })
  counters.push({
    image: Golden,
    value: scoreHelper.getPlayerGoldCardsScore(playerId)
  })
  return counters
}

const panelPosition = (players: number, index: number) => css`
  position: absolute;
  width: 38em;
  border: 0;
  ${getPanelPosition(players, index)};
`

const bottomRight = css`
  bottom: 1em;
  right: 1em;
`

const bottomLeft = css`
  bottom: 1em;
  left: 1em;
`

const topRight = css`
  top: 8.5em;
  right: 1em;
`

const topLeft = css`
  top: 8.5em;
  left: 1em;
`

const topCenter = css`
  top: 8.5em;
  left: calc(50dvw - 14em);
`

const bottomCenter = css`
  bottom: 1em;
  left: calc(50dvw - 14em);
`

const getPanelPosition = (index: number, nbPlayers: number) => {
  switch (index) {
    case 0:
      return bottomLeft
    case 1:
      if (nbPlayers === 2) return bottomRight
      return topLeft
    case 2:
      if (nbPlayers === 3) return bottomRight
      if (nbPlayers === 4) return topRight
      return topCenter
    case 3:
      if (nbPlayers === 4) return bottomRight
      return topRight
    case 4:
      return bottomRight
    case 5:
    default:
      return bottomCenter
  }
}

const getColorImage = (color: Colors) => {
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

const getSymbolImage = (symbol: Symbols) => {
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

const images: Record<number, string> = {
  1: Panel1,
  2: Panel2,
  3: Panel3,
  4: Panel4,
  5: Panel5,
  6: Panel6
}
