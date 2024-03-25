import {createContext, useContext, useState, useSyncExternalStore} from "react";

interface ITodo {
  name: string;
  isCompleted: boolean;
}

class Observer {
  private listeners: (() => void)[] = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);

    return () => {
      this.listeners = this.listeners.filter(fn => fn !== callback);
    };
  }

  protected notify() {
    this.listeners.forEach(listener => listener());
  }
}

class Store extends Observer {
  readonly state: ITodo = {name: 'Gokul', isCompleted: false};

  updateName() {
    this.state.name = "Gokulnath " + Math.ceil(Math.random() * 100);
    this.notify();
  }
}

const StoreContext = createContext<Store | null>(null);

const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) throw Error("StoreContext: value not provided");

  return store;
}

const useTodo = <T, >(select: (todo: ITodo) => T): T => {
  const store = useStore();

  return useSyncExternalStore(
    (onStoreChange) => store.subscribe(onStoreChange),
    () => select(store.state)
  );
}

const TodoName = () => {
  const name = useTodo((todo) => todo.name);

  console.log("[TodoName]")

  return <p>name: {name}</p>
}

const Completed = () => {
  const isComplted = useTodo((todo) => todo.isCompleted);

  console.log("[Completed]")

  return <p>isDone: {isComplted ? 'Yes' : 'No'}</p>
}

const Todo = () => {
  const store = useStore();

  console.log("[Todo]")

  return (
    <>
      <TodoName/>
      <button onClick={() => store.updateName()}>Update Name</button>
      <Completed />
    </>
  )
};

const TodoWrapper = () => {
  const [store] = useState(() => new Store());

  console.log("[TodoWraper]")

  return (
    <StoreContext.Provider value={store}>
      <Todo/>
    </StoreContext.Provider>
  )
}

export default TodoWrapper;
