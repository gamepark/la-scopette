import { Trans } from 'react-i18next'

export const ColorCardHelp = () => <>
  <h2><Trans i18nKey="color-card.title" defaults="Carte Couleur"/></h2>
  <p><Trans i18nKey="color-card.help.secret" defaults="Cette carte est secrète : vous seul·e connaissez votre couleur."/></p>
  <p><Trans i18nKey="color-card.help.setup" defaults="En debut de partie, vous recevez 1 carte couleur (2 pour les parties à 2 joueurs)"/></p>
  <p><Trans i18nKey="color-card.help.score" defaults="En fin de partie, vous marquez 1 point pour chaque carte Nombre capturée dont la couleur correspond à cette carte."/></p>
</>
