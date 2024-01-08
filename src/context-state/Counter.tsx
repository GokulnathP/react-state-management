import CounterProvider, { useCounter } from './CounterContext';
import StaticText from '../components/StaticText';
import CountValue from '../components/CountValue';
import IncrementButton from '../components/IncrementButton';
import DecrementButton from '../components/DecrementButton';

const CountValueWrapper = () => {
  const { count } = useCounter();

  console.log('[CountValueWrapper]');

  return <CountValue value={count}/>;
}

const IncrementButtonWrapper = () => {
  const { increment } = useCounter();

  console.log('[IncrementButtonWrapper]');

  return (
    <>
      <StaticText />
      <IncrementButton onClick={increment}/>
    </>
  );
}

const DecrementButtonWrapper = () => {
  const { decrement } = useCounter();

  console.log('[DecrementButtonWrapper]');

  return <DecrementButton onClick={decrement}/>;
}

const DummyWrapper = () => {
  console.log("[DummyWrapper");

  return <CountValueWrapper />;
}

const Counter = () => {
  console.log('[Counter] context');

  return (
    <CounterProvider>
      <StaticText/>
      <DummyWrapper />
      <IncrementButtonWrapper/>
      <DecrementButtonWrapper/>
    </CounterProvider>
  );
};

export default Counter;