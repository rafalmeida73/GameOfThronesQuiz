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
  AlternativesForm,
} from '../src/components';

function QuestionsWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [isQuestionSubmited, setIsQuestionSubmited] = useState();
  const questionId = `question__${questionIndex}`;
  const [selectedAlternative, setSelectedAlternative] = useState();
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

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

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative();
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativesForm>

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
  const [results, setResults] = useState([]);
  const questionIndex = currentQuestion;
  const [nickname, setNickName] = useState('');
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  useEffect(() => {
    const { name } = router.query;

    if (name === undefined) {
      router.push('/');
    }

    setNickName(name);

    if (screenState === 'LOADING') {
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 2 * 1000);
    }
  });

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  // eslint-disable-next-line no-shadow
  function ResultWidget({ results }) {
    return (
      <Widget>
        <Widget.Header>
          <h3>
            {results.filter((x) => x).length > 0 ? 'Parabéns' : 'Não foi dessa vez'}
            {', '}
            <strong style={{ textTransform: 'capitalize' }}>{nickname}</strong>
            !
          </h3>
        </Widget.Header>

        <Widget.Content>
          <p>
            Você acertou
            {' '}
            {results.filter((x) => x).length}
            {' '}
            perguntas!
          </p>
          <ul>
            {results.map((result, index) => (
              <li key={`result__${result}`}>
                #
                {index + 1}
                {' '}
                Resultado:
                {' '}
                {result === true
                  ? 'Acertou'
                  : 'Errou'}
              </li>
            ))}
          </ul>
        </Widget.Content>
      </Widget>
    );
  }

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
              addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget />}
          {screenState === screenStates.RESULT && (
            <ResultWidget results={results} />
          )}
        </QuizContainer>
        <BackgroundImage backgroundImage={db.bg} />
      </Content>
      <GitHubCorner projectUrl="https://github.com/rafalmeida73/quiz" />
    </QuizBackground>
  );
}
