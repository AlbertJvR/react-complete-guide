import { memo, useCallback, useMemo, useState } from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

// By structuring components smartly, you dont need memo. By moving the stuff to ConfigureCounter you dont need this anymore
const Counter =  memo(function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  /*
  * useMemo is used for functions, whereas memo is used for components.
  * useMemo should be used for functions that perform intensive calculations to ensure they only execute when they need to,
  * and not everytime a component is recreated. In this case, only if the initialCount is changed, should prime be calculated.
  * Use it sparingly as it can cost extra performance.
  */
  const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

  const [counter, setCounter] = useState(initialCount);

  // Functions are recreated which makes memo useless. Use useCallback hook to store internally and not recreate, then memo
  // in the IconButton component will do its job as these then remain constant as its the only props that "change" between
  // executions
  const handleDecrement = useCallback(function () {
    setCounter((prevCounter) => prevCounter - 1);
  }, []);

  const handleIncrement = useCallback(function () {
    setCounter((prevCounter) => prevCounter + 1);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={counter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
    </section>
  );
});

export default Counter;
