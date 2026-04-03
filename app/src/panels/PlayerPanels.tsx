import { css } from '@emotion/react'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<number>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel key={player.id} player={player} css={panelPosition(index, players.length)} activeRing />
      ))}
    </>,
    root
  )
}

const panelPosition = (players: number, index: number) => css`
  position: absolute;
  width: 28em;
  height: 8.3em;
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
