import { useEffect, useState } from 'react';

/*
* This was moved into its own component for optimization purposes. Every tick of the interval does a state update, so
* any component that houses that state will be re-rendered. This is bad because if done in a HEAVY component, it will
* negatively impact performance.
*/
export const ProgressBar = ({timer}) => {
    const [remainingTime, setRemainingTime] = useState(+timer);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log('INTERVAL');
            setRemainingTime(prevState => prevState - 10);
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress value={ remainingTime } max={ timer }/>
    )
}