import {queryOptions, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import todoService, {ITodo} from "../services/todo-service.ts";

const getTodoQueryKey = (id: string) => ['todo', id];

const getTodoQueryOptions = <T = ITodo, >(id: string, select?: (data: ITodo) => T) => queryOptions({
  queryKey: getTodoQueryKey(id),
  queryFn: () => todoService.getTodo(id),
  select
});

const useTodo = <T = ITodo, >(id: string, select?: (data: ITodo) => T) =>
  useQuery(getTodoQueryOptions(id, select));

const TodoName = () => {
  const {data} = useTodo('2', (todo: ITodo) => todo.name);

  const name: string = data!;
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
  const {data} = useTodo('2', (todo: ITodo) => todo.completedBy);

  const completedBy: string = data!;
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
