/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';
import {
  Widget,
  QuizLogo,
  QuizBackground,
  GitHubCorner,
  BackgroundImage,
  QuizContainer,
  Content,
  Button,
  Loading,
} from '../src/components';

function QuestionsWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
}) {
  let r;
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        src={question.image}
      />

      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit(infosDoEvento);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativeId}
              >
                <input
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onClick={() => r === alternative}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit">
            Confirmar
          </Button>
        </form>

      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function Quiz() {
  const router = useRouter();
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionIndex = currentQuestion;
  const [nickname, setNickName] = useState('');
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  useEffect(() => {
    const { name } = router.query;
    setNickName(name);

    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 2 * 1000);
  });

  function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>

        <Widget.Content>
          <Loading />
        </Widget.Content>
      </Widget>
    );
  }

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground>
      <Content>
        <QuizContainer>
          <QuizLogo />

          {screenState === screenStates.QUIZ && (
            <QuestionsWidget
              question={question}
              totalQuestions={totalQuestions}
              questionIndex={questionIndex}
              onSubmit={handleSubmitQuiz}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && (
            <div>
              Você acertou X questões, parabéns
              {' '}
              {nickname}
              !
            </div>
          )}
        </QuizContainer>
        <BackgroundImage backgroundImage={db.bg} />
      </Content>
      <GitHubCorner projectUrl="https://github.com/rafalmeida73/quiz" />
    </QuizBackground>
  );
}
