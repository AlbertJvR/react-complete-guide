import { useEffect, useState } from 'react';

export const QuestionTimer = ({timeout, onTimeout, mode}) => {
    const [remainingTime, setRemainingTime] = useState(+timeout);

    useEffect(() => {
        console.log("SET TIMEOUT");
        const timer = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onTimeout]);

    useEffect(() => {
        console.log("SET INTERVAL");

        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress
            id="question-time"
            max={ timeout }
            value={ remainingTime }
            className={ mode }
        />
    )
}