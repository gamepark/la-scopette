import { css } from '@emotion/react'
import { DevToolsHub, GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export function GameDisplay({ players }: GameDisplayProps) {
  const margin = { top: 7, left: 0, right: 0, bottom: 0 }

  const getTableWidth = (): { xMin: number; xMax: number; yMin: number; yMax: number } => {
    switch (players) {
      case 2:
        return { xMin: -40, xMax: 40, yMin: -12, yMax: 35 }
      case 3:
        return { xMin: -50, xMax: 50, yMin: -20, yMax: 34 }
      case 4:
        return { xMin: -50, xMax: 50, yMin: -20, yMax: 34 }
      default:
        return { xMin: -75, xMax: 50, yMin: -35, yMax: 45 }
    }
  }

  const getNavigationCss = () => {
    switch (players) {
      case 2:
        return css`
          left: 1em;
          top: 8em;
        `
      default:
        return css`
          left: 41em;
          top: 8em;
        `
    }
  }
  return (
    <>
      <GameTable
        xMin={getTableWidth().xMin}
        xMax={getTableWidth().xMax}
        yMin={getTableWidth().yMin}
        yMax={getTableWidth().yMax}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation css={getNavigationCss()}  />
        <PlayerPanels />
        {process.env.NODE_ENV === 'development' && <DevToolsHub fabBottom="calc(1em + 6em * 1.7)" />}
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
