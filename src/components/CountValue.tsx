const CountValue = ({ value }: { value: number }) => {
  console.log('[CountValue]');

  return <p>Count is: {value}</p>;
}

export default CountValue;