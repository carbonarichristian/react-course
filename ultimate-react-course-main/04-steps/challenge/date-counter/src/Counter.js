import './Counter.css';
import { useState } from 'react';

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + step);
  }

  function decreaseCount() {
    setCount(count - step);
  }

  function reset() {
    setCount(0);
    setStep(1);
    document.querySelector('input[type="range"]').value = 1;
  }

  return (
    <div className='Counter'>
      <h1>Date Counter</h1>
      <input type='range'
        min={0}
        max={10}
        onChange={ (e) => setStep(Number(e.target.value)) }
      >
      </input>
      <br />
      <button onClick={decreaseCount} >-</button>
      <input type='number' value={count} onChange={ (e) => setCount(Number(e.target.value)) } />
      <button onClick={increaseCount} >+</button>
      <hr />
      {
        count < 0 && (
          <p>
            {count} days ago was {new Date(Date.now() + count * 24 * 60 * 60 * 1000).toDateString()}
          </p>
        )
      }
      {
        count === 0 && (
          <p>Today is {new Date().toDateString()}</p>
        )
      }
      {
        count > 0 && (
          <p>
            {count} days from now will be {new Date(Date.now() + count * 24 * 60 * 60 * 1000).toDateString()}
          </p>
        )
      }

      {
        (count !== 0 || step !== 1) ?
        <button onClick={reset}>Reset</button>
        : null
      }


    </div>
  );
}

export default Counter;
