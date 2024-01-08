import StaticText from '../components/StaticText';
import CountValue from '../components/CountValue';
import IncrementButton from '../components/IncrementButton';
import { Provider, shallowEqual, useDispatch, useSelector } from 'react-redux';
import store, { increment1, increment2, RootState } from './CounterSlice';

const CountValue1Wrapper = () => {
  const count = useSelector((state: RootState) => state.counter.count1);

  console.log('[CountValue1Wrapper]');

  return (
    <>
      <StaticText/>
      <CountValue value={count}/>
    </>
  );
}

const CountValue2Wrapper = () => {
  const { count2: count } = useSelector((state: RootState) => ({ count2: state.counter.count2 }), shallowEqual);

  console.log('[CountValue2Wrapper]');

  return (
    <>
      <StaticText/>
      <CountValue value={count}/>
    </>
  );
}

const IncrementButton1Wrapper = () => {
  const dispatch = useDispatch();

  console.log('[IncrementButton1Wrapper]');

  return <IncrementButton onClick={() => dispatch(increment1())}/>;
}

const IncrementButton2Wrapper = () => {
  const dispatch = useDispatch();

  console.log('[IncrementButton2Wrapper]');

  return <IncrementButton onClick={() => dispatch(increment2())}/>;
}

const DummyWrapper = () => {
  console.log('[DummyWrapper');

  return <CountValue1Wrapper/>;
}

const Counter = () => {
  console.log('[Counter] redux');

  return (
    <Provider store={store}>
      <StaticText/>
      <DummyWrapper/>
      <CountValue2Wrapper />
      <IncrementButton1Wrapper/>
      <IncrementButton2Wrapper/>
    </Provider>
  );
};

export default Counter;