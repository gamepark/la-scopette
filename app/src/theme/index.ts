import { css } from '@emotion/react'
import { defaultTheme, GameTheme } from '@gamepark/react-game'
import { colors } from './colors'
import { fontBody, fontDisplay } from './typography'

const buttonBase = css`
  background: ${colors.purple} !important;
  color: ${colors.white} !important;
  border: 0.15em solid ${colors.purpleDeep} !important;
  border-radius: 2em !important;
  padding: 0.4em 1.1em !important;
  font-family: ${fontDisplay};
  font-weight: 800;
  letter-spacing: 0.03em;
  cursor: pointer;
  box-shadow: 0 0.25em 0 ${colors.purpleDeep}, 0 0.35em 0.5em rgba(0, 0, 0, 0.25);
  transition: background 120ms ease, transform 80ms ease, box-shadow 80ms ease;
  outline: none !important;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.gold} !important;
    border-color: ${colors.goldDeep} !important;
    color: ${colors.dark} !important;
    box-shadow: 0 0.25em 0 ${colors.goldDeep}, 0 0.35em 0.5em rgba(0, 0, 0, 0.25);
  }

  &:focus:not(:hover):not(:disabled) {
    background: ${colors.purple} !important;
    color: ${colors.white} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.goldDeep} !important;
    border-color: ${colors.goldDeep} !important;
    color: ${colors.dark} !important;
    box-shadow: 0 0.05em 0 ${colors.goldDeep}, 0 0.1em 0.2em rgba(0, 0, 0, 0.2);
    transform: translateY(0.15em);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    box-shadow: none;
  }
`

const dialogContainer = css`
  border-radius: 1em;
  box-shadow:
    0 0 0 0.15em ${colors.purple},
    0 0.8em 2em rgba(0, 0, 0, 0.35);
`

const dialogContent = css`
  font-family: ${fontBody};
  font-weight: 600;
  color: ${colors.dark};

  h2 {
    font-family: ${fontDisplay};
    font-weight: 800;
    color: ${colors.purpleDeep};
  }

  h3 {
    font-family: ${fontDisplay};
    font-weight: 700;
    color: ${colors.purple};
  }

  p {
    line-height: 1.55;
  }

  strong, b {
    color: ${colors.purpleDeep};
    font-weight: 800;
  }
`

const dialogCloseIcon = css`
  color: ${colors.purple};
  transition: color 120ms ease, transform 120ms ease;

  &:hover {
    color: ${colors.purpleDeep};
    transform: scale(1.15);
  }
`

const headerBar = css`
  background: rgba(104, 46, 154, 0.93);
  border-bottom: 0.15em solid ${colors.goldLight};
  color: ${colors.white};
  font-family: ${fontDisplay};
  font-weight: 700;
  box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.4);

  h1 {
    color: ${colors.white};
    font-weight: 800;
  }

  b, strong {
    color: ${colors.goldLight};
  }
`

const headerButtons = css`
  background: transparent !important;
  color: ${colors.white} !important;
  border: 0.1em solid rgba(255, 255, 255, 0.6) !important;
  border-radius: 1.5em !important;
  font-family: ${fontDisplay};
  font-weight: 700;
  cursor: pointer;
  padding: 0 0.5em !important;
  box-shadow: none !important;
  outline: none !important;
  transition: background 120ms ease, color 120ms ease;

  &:hover:not(:disabled),
  &:focus:hover:not(:disabled) {
    background: ${colors.goldLight} !important;
    color: ${colors.dark} !important;
    border-color: ${colors.goldLight} !important;
  }

  &:focus:not(:hover):not(:disabled) {
    background: transparent !important;
    color: ${colors.white} !important;
  }

  &:active:not(:disabled) {
    background: ${colors.gold} !important;
    color: ${colors.dark} !important;
  }
`

const journalHistoryEntry = css`
  background-color: ${colors.purplePale} !important;
  border: 0.08em solid rgba(136, 68, 187, 0.2) !important;
  border-left: 0.3em solid ${colors.purple} !important;
  border-radius: 0.5em !important;
  color: ${colors.dark} !important;
  font-family: ${fontBody} !important;
  font-weight: 600;
  padding: 0.55em 0.8em 0.55em 0.9em !important;
  margin: 0.35em 0 !important;
  box-sizing: border-box !important;
  box-shadow: 0 0.1em 0.25em rgba(0, 0, 0, 0.1) !important;

  strong, b { color: ${colors.purpleDeep}; font-weight: 800; }
  a { color: ${colors.purpleDeep}; font-weight: 700; }
`

const menuPanel = css`
  background: ${colors.white};
  color: ${colors.dark};
  border-radius: 1em;
  box-shadow:
    0 0 0 0.12em ${colors.purple},
    0 0.6em 1.5em rgba(0, 0, 0, 0.3);
  font-family: ${fontDisplay};

  h2 {
    color: ${colors.purpleDeep};
    font-weight: 800;
    border-bottom: 0.15em solid ${colors.goldLight};
    padding-bottom: 0.3em;
  }
`

const menuMainButton = css`
  background: ${colors.gold} !important;
  color: ${colors.dark} !important;
  border: 0.15em solid ${colors.goldDeep} !important;
  border-radius: 2em !important;
  font-weight: 800 !important;
  box-shadow: 0 0.2em 0 ${colors.goldDeep} !important;
  outline: none !important;

  &:hover:not(:disabled) {
    background: ${colors.goldLight} !important;
  }

  &:active:not(:disabled) {
    box-shadow: none !important;
    transform: translateY(0.1em);
  }
`

const tutorialContainer = css`
  font-family: ${fontBody};
  font-weight: 600;
  color: ${colors.dark};
  background: ${colors.white};
  border-radius: 0.8em;

  h2, h3 {
    font-family: ${fontDisplay};
    color: ${colors.purpleDeep};
    font-weight: 800;
  }

  strong, b { color: ${colors.purpleDeep}; }
`

export const theme: GameTheme = {
  ...defaultTheme,
  root: {
    ...defaultTheme.root,
    fontFamily: fontBody
  },
  palette: {
    primary: colors.purple,
    primaryHover: colors.purpleLight,
    primaryActive: colors.purpleDeep,
    primaryLight: colors.purplePale,
    primaryLighter: colors.purplePaler,
    surface: colors.white,
    onSurface: colors.dark,
    onSurfaceFocus: colors.purplePale,
    onSurfaceActive: '#E4D4F5',
    danger: '#D93030',
    dangerHover: '#B02020',
    dangerActive: '#8A1818',
    disabled: '#999999'
  },
  buttons: buttonBase,
  dialog: {
    ...defaultTheme.dialog,
    backgroundColor: colors.white,
    color: colors.dark,
    container: dialogContainer,
    content: dialogContent,
    closeIcon: dialogCloseIcon,
    buttons: buttonBase
  },
  journal: {
    ...(defaultTheme.journal ?? {}),
    historyEntry: journalHistoryEntry
  },
  header: {
    bar: headerBar,
    buttons: headerButtons
  },
  menu: {
    panel: menuPanel,
    mainButton: menuMainButton
  },
  playerPanel: {
    activeRingColors: [colors.gold, colors.purple]
  },
  tutorial: {
    container: tutorialContainer
  }
}
