import { useState } from "react";

const Hello = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello</h1>
      <button aria-label="decrement" onClick={() => setCount(count - 1)}>
        minus
      </button>
      <p>count: {count}</p>
      <button aria-label="increment" onClick={() => setCount(count + 1)}>
        plus
      </button>
    </div>
  );
};

export default Hello;
