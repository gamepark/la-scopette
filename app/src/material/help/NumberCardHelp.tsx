/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Trans } from 'react-i18next'

export const NumberCardHelp = () => {
  return (
    <>
      <h2><Trans i18nKey="number-card.title"/></h2>
      <p><Trans i18nKey="number-card.help.play"/></p>
      <p><Trans i18nKey="number-card.help.capture"/></p>
      <p><Trans i18nKey="number-card.help.capture2"/></p>
      <p><Trans i18nKey="number-card.help.gold"/></p>
      <p><Trans i18nKey="number-card.help.score"/></p>
      <div css={warning}>
        <p><Trans i18nKey="number-card.help.warning" components={{bold: <strong />}}/></p>
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
