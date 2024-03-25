import {queryOptions, useMutation, useQuery, useQueryClient, UseQueryResult,} from "@tanstack/react-query";
import todoService, {ITodo} from "../services/todo-service.ts";

const useQueryData = <TData, TError>(query: UseQueryResult<TData, TError>) => {
  return query as UseQueryResult<TData, TError> & { data: TData };
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
  const {data: name} = useQueryData(useTodo('2', (todo: ITodo) => todo.name));

  console.log("[TodoName]");

  return <p>Todo: {name}</p>
}

const CompleteTodo = () => {
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: todoService.completeTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: getTodoQueryKey('2')})
    }
  });

  console.log("[CompleteTodo]");

  const complete = () => mutate({id: '2', completedBy: 'Gokulnath'})

  return <button onClick={complete}>Complete</button>
}

const CompletedBy = () => {
  const {data: completedBy} = useQueryData(useTodo('2', (todo: ITodo) => todo.completedBy))

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
