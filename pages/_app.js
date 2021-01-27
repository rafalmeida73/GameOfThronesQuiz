import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

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
`;

const { theme } = db;

// eslint-disable-next-line react/prop-types
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
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
        <meta name="title" content="Quiz Game of Thrones" />
        <meta name="description" content="Teste os seus conhecimentos sobre Game of Thrones e vamos ver o quanto você é viciado nessa série!" />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quiz.rafalmeida73.vercel.app/" />
        <meta property="og:title" content="Quiz Game of Thrones" />
        <meta property="og:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
        <meta property="og:image" content="/capa.png" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://quiz.rafalmeida73.vercel.app/" />
        <meta property="twitter:title" content="Quiz Game of Thrones" />
        <meta property="twitter:description" content="Teste os seus conhecimentos sobre Game of Thrones e vamos ver o quanto você é viciado nessa série!" />
        <meta property="twitter:image" content="/capa.png" />
      </Head>

      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
