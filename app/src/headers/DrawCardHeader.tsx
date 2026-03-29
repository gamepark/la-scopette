import { HeaderText } from '@gamepark/react-game'

export const DrawCardHeader = () => {
  return <HeaderText code="header.draw-card" defaults={{
    you: "Vous piochez une carte",
    player: "{player} pioche une carte",
  }}/>
}
