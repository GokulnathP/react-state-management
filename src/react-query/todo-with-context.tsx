import {queryOptions, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import todoService, {ITodo} from "../services/todo-service.ts";
import {createContext, useContext} from "react";

const TodoContext = createContext<ITodo | null>(null);

const useTodoData = () => {
  const todo = useContext(TodoContext);

  if (!todo) throw Error('TodoContext: No value provided')

  return todo;
}

const getTodoQueryKey = (id: string) => ['todo', id];

const getTodoQueryOptions = <T = ITodo, >(id: string, select?: (data: ITodo) => T) => queryOptions({
  queryKey: getTodoQueryKey(id),
  queryFn: () => todoService.getTodo(id),
  select
});

const useTodo = <T = ITodo, >(id: string, select?: (data: ITodo) => T) =>
  useQuery(getTodoQueryOptions(id, select));

const TodoName = () => {
  const { name } = useTodoData();

  console.log("[TodoName]");

  return <p>Todo: {name}</p>
}

const CompleteTodo = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({mutationFn: todoService.completeTodo});

  console.log("[CompleteTodo]");

  const complete = () => {
    mutate({id: '2', completedBy: 'Gokulnath'}, {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: getTodoQueryKey('2')})
      }
    })
  }

  return <button onClick={complete}>Complete</button>
}

const CompletedBy = () => {
  const { completedBy } = useTodoData();

  console.log("[CompletedBy]");

  if (completedBy) return <p>Completed by: {completedBy}</p>;

  return <CompleteTodo/>
}

const Todo = () => {
  const {isPending, isError, data} = useTodo('2');

  console.log("[TodoWithContext]");

  if (isPending) return <p>Loading todo...</p>

  if (isError) return <p>Error retrieving todo!!</p>

  return (
    <TodoContext.Provider value={data}>
      <TodoName/>
      <CompletedBy/>
    </TodoContext.Provider>
  );
}

export default Todo;
