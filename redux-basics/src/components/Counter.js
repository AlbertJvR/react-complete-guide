import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DECREMENT, INCREASE, INCREMENT, TOGGLE } from '../store';

const Counter = () => {
    const toggleCounterHandler = () => {
        dispatch({ type: TOGGLE })
    };

    // Automatically sets up the subscription to the store and component will be re-rendered if the state value changes
    const counter = useSelector((state) => state.counter);
    const show = useSelector((state) => state.showCounter);

    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch({ type: INCREMENT });
    }

    const increaseHandler = () => {
        dispatch({ type: INCREASE, payload: 5 });
    };

    const decrementHandler = () => {
        dispatch({ type: DECREMENT });
    }

    return (
        <main className={ classes.counter }>
            <h1>Redux Counter</h1>
            { show && <div className={ classes.value }>{ counter }</div> }
            <div>
                <button onClick={ incrementHandler }>Increment</button>
                <button onClick={ increaseHandler }>Increase by 5</button>
                <button onClick={ decrementHandler }>Decrement</button>
            </div>
            <button onClick={ toggleCounterHandler }>Toggle Counter</button>
        </main>
    );
};

export default Counter;
