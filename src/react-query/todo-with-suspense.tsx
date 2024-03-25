import {queryOptions, useMutation, useQuery, useQueryClient, useSuspenseQuery} from "@tanstack/react-query";
import todoService, {ITodo} from "../services/todo-service.ts";

const getTodoQueryKey = (id: string) => ['todo', id];

const getTodoQueryOptions = <T = ITodo, >(id: string, select?: (data: ITodo) => T) => queryOptions({
  queryKey: getTodoQueryKey(id),
  queryFn: () => todoService.getTodo(id),
  select
});

const useTodo = <T = ITodo, >(id: string, select?: (data: ITodo) => T) =>
  useQuery(getTodoQueryOptions(id, select));

const useTodoData = <T = ITodo, >(id: string, select?: (data: ITodo) => T) =>
  useSuspenseQuery(getTodoQueryOptions(id, select));

const TodoName = () => {
  const {data: name} = useTodoData('2', (todo) => todo.name);

  console.log("[TodoName]");

  return <p>Todo: {name}</p>
}

const CompleteTodo = () => {
  const queryClient = useQueryClient();
  const {mutateAsync} = useMutation({mutationFn: todoService.completeTodo});

  console.log("[CompleteTodo]");

  const complete = () => {
    mutateAsync({id: '2', completedBy: 'Gokulnath'})
      .then(() => queryClient.invalidateQueries({queryKey: getTodoQueryKey('2')}))
  }

  return <button onClick={complete}>Complete</button>
}

const CompletedBy = () => {
  const {data: completedBy} = useTodoData('2', (todo: ITodo) => todo.completedBy);

  console.log("[CompletedBy]");

  if (completedBy) return <p>Completed by: {completedBy}</p>;

  return <CompleteTodo/>
}

const Todo = () => {
  const {isLoading, isError} = useTodo('2');

  console.log("[TodoWithContext]");

  if (isLoading) return <p>Loading todo...</p>

  if (isError) return <p>Error retrieving todo!!</p>

  return (
    <>
      <TodoName/>
      <CompletedBy/>
    </>
  );
}

export default Todo;
