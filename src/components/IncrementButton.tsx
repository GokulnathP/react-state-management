const IncrementButton = ({ onClick }: { onClick: () => void }) => {
  console.log('[IncrementButton]')

  return <button onClick={onClick}>Increment</button>;
}

export default IncrementButton;