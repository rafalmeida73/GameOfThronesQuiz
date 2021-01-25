import { createGlobalStyle, ThemeProvider } from 'styled-components';
import db from '../db.json';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quiz Game of Thrones</title>
        <meta name="theme-color" content="#ffffff" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Teste os seus conhecimentos sobre Game of Thrones e vamos ver o quanto você é viciado nessa série!"
        />
        <meta name="robots" content="noindex"/>
        <meta name="googlebot" content="noindex"/>
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}