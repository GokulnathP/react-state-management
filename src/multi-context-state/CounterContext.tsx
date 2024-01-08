import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

const CounterContext = createContext({ count: 0 });
const CounterActionsContext = createContext({
  increment: () => {},
  decrement: () => {}
});

const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState({ count: 0 });

  const increment = useCallback(() => setState(prevState => ({ count: prevState.count + 1 })), []);
  const decrement = useCallback(() => setState(prevState => ({ count: prevState.count - 1 })), []);

  console.log('[CounterProvider]');

  const actions = useMemo(() => ({ increment, decrement }), [increment, decrement]);
  return (
    <CounterContext.Provider value={state}>
      <CounterActionsContext.Provider value={actions}>
        {children}
      </CounterActionsContext.Provider>
    </CounterContext.Provider>
  )
};

export const useCounter = () => useContext(CounterContext);
export const useCounterActions = () => useContext(CounterActionsContext);

export default CounterProvider;