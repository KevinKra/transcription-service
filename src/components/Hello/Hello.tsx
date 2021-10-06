import { useState } from "react";

interface IHello {
  title: string;
}

const Hello = ({ title }: IHello) => {
  const [incrementor, setIncrementor] = useState(1);
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>{title}</h1>
      <label>
        Incrementor:
        <input
          value={incrementor}
          onChange={(e) => setIncrementor(parseInt(e.target.value) || 0)}
          aria-label="incrementor"
          type="number"
        />
      </label>
      <button
        aria-label="decrement"
        onClick={() => setCount(count - incrementor)}
      >
        minus
      </button>
      <p>count: {count}</p>
      <button
        aria-label="increment"
        onClick={() => setCount(count + incrementor)}
      >
        plus
      </button>
    </div>
  );
};

export default Hello;
