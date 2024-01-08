import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import CountValue from '../components/CountValue';
import IncrementButton from '../components/IncrementButton';

interface ProductResponse {
  total: number,
  limit: number,
  products: [],
}

const NestedChild2 = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery<ProductResponse>({
    queryKey: ['products'],
    queryFn: () => axios.get('https://dummyjson.com/carts/1').then(res => res.data)
  });
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }, [queryClient]);

  return (
    <div>
      <CountValue value={count}/>
      <IncrementButton onClick={handleClick}/>
      <p>product count: {data?.products.length}</p>
    </div>
  );
}

const NestedChild = () => {
  const { data } = useQuery<ProductResponse>({ queryKey: ['products'] });
  const { mutateAsync } = useMutation({
    mutationFn: (id: number) => axios.get(`https://dummyjson.com/carts/${id}`).then(res => res.data as { a: number })
  });

  useEffect(() => {
    mutateAsync(1).then(res => console.log(res))
  }, []);

  return <p>total: {data?.total}</p>
}

const Child = () => {
  const { isFetching, data } = useQuery<ProductResponse>({ queryKey: ['products'], refetchOnMount: 'always' });

  return (
    <div>
      {isFetching && <p>Loading...</p>}
      <NestedChild/>
      <NestedChild2/>
      <p>limit: {data?.limit}</p>
    </div>
  );
}

const Wrapper = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get('https://dummyjson.com/products').then(res => res.data)
  });
  const [count, setCount] = useState(0);

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (isError) {
    return <p>Error occurred while fetching the data</p>
  }

  return (
    <div>
      <CountValue value={count}/>
      <IncrementButton onClick={() => setCount(count + 1)}/>
      <Child/>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Wrapper;