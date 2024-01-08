const DecrementButton = ({ onClick }: { onClick: () => void }) => {
  console.log('[DecrementButton]')

  return <button onClick={onClick}>Decrement</button>;
}

export default DecrementButton;