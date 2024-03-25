import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from 'react';

interface CounterState {
  count: number;
}

enum CounterActionTypes {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT'
}

interface IncrementAction {
  type: CounterActionTypes.INCREMENT;
  payload: number;
}

interface DecrementAction {
  type: CounterActionTypes.DECREMENT;
}

type CounterAction = IncrementAction | DecrementAction;

const initialState: CounterState = {
  count: 0
};

const CounterContext = createContext(initialState);
const CounterDispatchContext = createContext<Dispatch<CounterAction>>(() => {});

const counterReducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case CounterActionTypes.INCREMENT: {
      return { ...state, count: state.count + action.payload }
    }
    case CounterActionTypes.DECREMENT: {
      return { ...state, count: state.count - 1 }
    }
    default:
      return state;
  }
}

const CounterProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <CounterContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>
        {children}
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
  );
}

export const useCounter = () => {
  return useContext(CounterContext);
}

const useCounterDispatch = () => {
  return useContext(CounterDispatchContext);
}

export const useCounterActions = () => {
  const dispatch = useCounterDispatch();

  const increment = () => {
    dispatch({ type: CounterActionTypes.INCREMENT, payload: 1 });
    dispatch({ type: CounterActionTypes.INCREMENT, payload: 1 });
  }

  const decrement = () => dispatch({ type: CounterActionTypes.DECREMENT });

  return { increment, decrement };
}

export default CounterProvider;