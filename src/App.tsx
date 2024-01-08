import './App.css'
import Counter from './multi-context-state/Counter';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import Wrapper from './react-query/Wrapper';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity, retry: false } } });

const App = () => {
  console.log('[App]')

  return (
    <QueryClientProvider client={queryClient}>
      <Counter/>
      <Wrapper/>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
};

export default App;
