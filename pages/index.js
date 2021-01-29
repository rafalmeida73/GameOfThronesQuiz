/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import db from '../db.json';
import {
  Widget,
  QuizLogo,
  QuizBackground,
  Footer,
  GitHubCorner,
  Form,
  QuizContainer,
  Content,
} from '../src/components';
import Link from '../src/components/Link';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  function onSubmit(e) {
    router.push(`/quiz?name=${name}`);

    e.preventDefault();
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Content>
        <QuizContainer>
          <QuizLogo />
          <Widget
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
            initial="hidden"
            animate="show"
          >
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

          <Widget
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
          >
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p style={{ marginBottom: '25px' }}>
                Dá uma olhada nesses quizes incríveis que o pessoal da Imersão Alura fez:
              </p>

              <ul>
                {db.external.map((linkExterno) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li key={linkExterno}>
                      <Widget.Topic
                        as={Link}
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>

            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
      </Content>
      <GitHubCorner projectUrl="https://github.com/rafalmeida73/quiz" />
    </QuizBackground>
  );
}
