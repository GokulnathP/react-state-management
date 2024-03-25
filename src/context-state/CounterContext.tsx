import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export const CounterContext = createContext({
  count: 0,
  increment: () => {},
  decrement: () => {}
});

const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(prevCount => prevCount + 1), []);
  const decrement = useCallback(() => setCount(prevCount => prevCount - 1), []);

  console.log('[CounterProvider]');

  const value = useMemo(() => ({ count, increment, decrement }),[count]);
  return <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
};

export const useCounter = () => useContext(CounterContext);

export default CounterProvider;