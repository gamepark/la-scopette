import { Trans } from 'react-i18next'

export const SymbolCardHelp = () => <>
  <h2><Trans i18nKey="symbol-card.title" defaults="Carte Symbole"/></h2>
  <p><Trans i18nKey="symbol-card.help.setup" defaults="En début de partie, 1 carte symbole est placée entre chaque joueurs (2 pour les parties à 2 joueurs)"/></p>
  <p><Trans i18nKey="symbol-card.help.score" defaults="En fin de partie, vous marquez 1 point pour chaque carte Nombre capturée portant un le même symbole que les cartes cous entourant."/></p>
</>
