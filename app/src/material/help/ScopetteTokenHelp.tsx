import { Trans } from 'react-i18next'

export const ScopetteTokenHelp = () => <>
  <h2><Trans i18nKey="scopette-token.title" defaults="Jeton Scopette"/></h2>
  <p><Trans i18nKey="scopette-token.help.earn" defaults="Vous gagnez 1 jeton scopette dès que vous capturez la dernière carte de la table, ou lorsque vous jouez votre dernière carte en main."/></p>
  <p><Trans i18nKey="scopette-token.help.grand" defaults="Si les deux se produisent en même temps (vous jouez votre dernière carte et videz la table) vous gagnez 4 jetons !"/></p>
  <p><Trans i18nKey="scopette-token.help.score" defaults="Chaque jeton vaut 1 point en fin de partie."/></p>
</>
