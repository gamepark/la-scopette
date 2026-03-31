/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trans } from 'react-i18next'

export const NumberCardHelp = () => {
  return (
    <>
      <h2><Trans i18nKey="number-card.title" defaults="Carte Nombre"/></h2>
      <p><Trans i18nKey="number-card.help.play" defaults="À votre tour, jouez une carte de votre main vers la table."/></p>
      <p><Trans i18nKey="number-card.help.capture" defaults="Si une carte de la table, ou le total de plusieurs cartes, est égale à la valeur de votre carte jouée, vous les capturez toutes et les placez dans votre pile de score."/></p>
      <p><Trans i18nKey="number-card.help.capture2" defaults="Vous pouvez également jouer plusieurs cartes de votre main, afin de récupérer 1 carte de la table dont la valeur est égale à la somme des cartes jouées."/></p>
      <p><Trans i18nKey="number-card.help.gold" defaults="Les cartes Or (1, 4, 7, 10) n'ont ni couleur ni symbole, mais chacune capturée rapporte 1 point."/></p>
      <p><Trans i18nKey="number-card.help.score" defaults="Chaque carte capturée rapporte aussi 1 point si elle correspond à votre couleur secrète, et 1 point si elle porte l'un de vos deux symboles."/></p>
      <div css={warning}>
        <p><Trans i18nKey="number-card.help.warning" components={{bold: <strong />}} defaults="Attention : vous <bold>ne pouvez pas</bold> jouer plusieurs cartes pour récupérer plusieurs cartes !"/></p>
      </div>
    </>
  )
}

const warning = css`
  padding: 0.5rem;
  background-color: rgba(255, 0, 0, 0.2);
  border: 1px solid red;
  color: red;
  border-radius: 0.5rem;
`