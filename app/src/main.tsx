import { LaScopetteOptionsSpec } from '@gamepark/la-scopette/LaScopetteOptions.ts'
import { LaScopetteRules } from '@gamepark/la-scopette/LaScopetteRules.ts'
import { LaScopetteSetup } from '@gamepark/la-scopette/LaScopetteSetup.ts'
import { GameProvider } from '@gamepark/react-game'
import { theme } from './theme'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { LaScopetteLogDescription } from './logs/LaScopetteLogDescription'
import { Material } from './material/Material'
import { LaScopetteScoring } from './scoring/LaScopetteScoring.tsx'
import { Tutorial } from './tutorial/Tutorial'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="la-scopette"
      Rules={LaScopetteRules}
      optionsSpec={LaScopetteOptionsSpec}
      GameSetup={LaScopetteSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      logs={new LaScopetteLogDescription()}
      scoring={new LaScopetteScoring()}
      tutorial={new Tutorial()}
      theme={theme}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
