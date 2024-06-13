import { useCallback, useState } from 'react';

import QUESTIONS from '../questions.js';
import { Question } from './Question.jsx';
import { Summary } from './Summary.jsx';

export const Quiz = () => {
    const [userAnswers, setUserAnswers] = useState([]);

    // have to do this check to ensure this only changes once the user answered the question due to the handleSelectAnswer
    // useCallback dependency. (no longer needed as state moved to question component)
    // const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const activeQuestionIndex = userAnswers.length;

    const quizComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswers(prevState => {
            return [...prevState, selectedAnswer];
        });
    }, []);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizComplete) {
        return <Summary userAnswers={userAnswers} />;
    }

    /*
    * The "key" prop is set to ensure that the component is recreated when the value changes. Without it, the component is
    * never recreated which means that the value for the progress bar is never reset when the question changes and the progress
    * bar remains empty after 1 question. With this trick, when the value for the key changes, React recreates the component
    * and all the values are reset.
    */

    return (
        <div id="quiz">
            <Question
                key={ activeQuestionIndex }
                index={ activeQuestionIndex }
                onSelectAnswer={ handleSelectAnswer }
                onSkipAnswer={ handleSkipAnswer }
            />
        </div>
    )
}