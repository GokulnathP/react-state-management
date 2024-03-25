import './App.css'
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Todo from "./react-query/todo.tsx";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });

const App = () => {
  console.log('[App]')

  return (
    <QueryClientProvider client={queryClient}>
      <Todo />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default App;
