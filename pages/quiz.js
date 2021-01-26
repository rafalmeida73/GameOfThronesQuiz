import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import db from '../db.json';
import {
  Widget, QuizLogo, QuizBackground, Footer, GitHubCorner, BackgroundImage,
} from '../src/components';

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
`;

export default function Quiz() {
  const router = useRouter();
  const [nickname, setNickName] = useState('');

  useEffect(() => {
    const { name } = router.query;
    setNickName(name);
  });

  return (
    <QuizBackground>
      <Content>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>{db.title}</h1>
            </Widget.Header>
            <Widget.Content>
              <p>{db.description}</p>
              <p>{nickname}</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <BackgroundImage backgroundImage={db.bg} />
      </Content>
      <GitHubCorner projectUrl="https://github.com/rafalmeida73/quiz" />
    </QuizBackground>
  );
}
