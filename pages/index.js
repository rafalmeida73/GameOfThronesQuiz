import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import {
  Widget,
  QuizLogo,
  QuizBackground,
  Footer,
  GitHubCorner,
  BackgroundImage,
  Form,
  QuizContainer,
  Content,
  Quizes,
} from '../src/components';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function onSubmit(e) {
    router.push(`/quiz?name=${name}`);

    e.preventDefault();
  }

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
              <Form onSubmit={onSubmit}>
                <input name="nome do usuario" placeholder="Diz aí seu nome para jogar :)" onChange={(e) => setName(e.target.value)} />
                <button type="submit" disabled={name.length === 0}>
                  Jogar
                </button>
              </Form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p style={{ marginBottom: '25px' }}>
                Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alguma coisa fez:
              </p>
              <Quizes>
                clebinhodj/showdomilhaoalura
              </Quizes>
              <Quizes>
                clebinhodj/showdomilhaoalura
              </Quizes>
              <Quizes>
                clebinhodj/showdomilhaoalura
              </Quizes>

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
