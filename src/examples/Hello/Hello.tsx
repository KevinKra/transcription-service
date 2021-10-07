import { useState, useEffect } from "react";

interface IHello {
  title: string;
}

const Hello = ({ title }: IHello) => {
  const [incrementor, setIncrementor] = useState(1);
  const [count, setCount] = useState(0);
  const [bigEnough, setBigEnough] = useState(false);

  // ? standard for controlled timeouts
  // useEffect(() => {
  //   let id: NodeJS.Timeout;
  //   if (count >= 5) {
  //     id = setTimeout(() => setBigEnough(true), 300);
  //   }
  //   return function cleanUp() {
  //     // ? function named 'cleanUp' to avoid anonymous declaration
  //     clearTimeout(id);
  //   };
  // }, [count]);

  // ? alt for uncontrolled timeouts
  useEffect(() => {
    let active = true;
    if (count >= 5) {
      setTimeout(() => active && setBigEnough(true), 300);
    }
    return function cleanUp() {
      active = false;
    };
  }, [count]);

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
        onClick={() => setTimeout(() => setCount(count + incrementor), 200)}
      >
        plus
      </button>

      {bigEnough ? null : <div>I am too small</div>}
    </div>
  );
};

export default Hello;
