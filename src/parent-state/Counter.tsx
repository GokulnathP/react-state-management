import { useState } from 'react';
import StaticText from '../components/StaticText';
import CountValue from '../components/CountValue';
import IncrementButton from '../components/IncrementButton';
import DecrementButton from '../components/DecrementButton';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  console.log("[Counter] Parent state");

  return (
    <>
      <StaticText/>
      <CountValue value={count} />
      <IncrementButton onClick={increment} />
      <DecrementButton onClick={decrement} />
    </>
  );
}

export default Counter;