import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './Components/Loading';
import QuizForm from './Components/QuizForm';
import { useGlobalContext } from './context';
import Modal from './Modal';

const App = () => {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer
  } = useGlobalContext();

  const [timer, setTimer] = useState(5); // Initial timer value in seconds
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let timerInterval;
    if (timerRunning) {
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          // Decrease timer by 1, but make sure it doesn't go below 0
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [timerRunning]);

  useEffect(() => {
    if (timer === 0) {
      handleAnswerClick(null); // Automatically submit answer when timer runs out
    }
  }, [timer]);

  const startTimer = () => {
    setTimer(5); // Reset timer
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  if (waiting) {
    return <QuizForm />;
  }
  if (loading) {
    return <Loading />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];

  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);
  if (tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  const handleAnswerClick = (answer) => {
    stopTimer(); // Stop timer when an answer is selected
    checkAnswer(answer === correct_answer);
    nextQuestion();
  };

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p>Correct Answer: {correct}/{index}</p>
        <div>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            {answers.map((answer, index) => (
              <button
                key={index}
                style={{ width: "60%", textAlign: "center" }}
                className={`btn btn-info answer-btn ${answer === correct_answer ? 'correct' : 'incorrect'}`}
                onClick={() => handleAnswerClick(answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </div>
        </div>
        <button className='btn btn-warning next-question' style={{ width: "20%", marginRight: "1rem" }} onClick={nextQuestion}>Next Question</button>
        <div className="timer">Time Left: {timer} seconds</div>
      </section>
    </main>
  );
}

export default App;
