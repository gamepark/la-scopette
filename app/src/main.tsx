import { GameTemplateOptionsSpec } from '@gamepark/la-scopette/GameTemplateOptions'
import { GameTemplateRules } from '@gamepark/la-scopette/GameTemplateRules'
import { GameTemplateSetup } from '@gamepark/la-scopette/GameTemplateSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="la-scopette"
      Rules={GameTemplateRules}
      optionsSpec={GameTemplateOptionsSpec}
      GameSetup={GameTemplateSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
