import './Counter.css';
import { useState } from 'react';

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  function increaseStep() {
    setStep(step + 1);
  }

  function decreaseStep() {
    step > 1 ? setStep(step - 1): alert('Step cannot be less than 1');
  }

  function increaseCount() {
    setCount(count + step);
  }

  function decreaseCount() {
    setCount(count - step);
  }

  return (
    <div className='Counter'>
      <button onClick={decreaseStep} >-</button>
      <span>Step: {step}</span>
      <button onClick={increaseStep} >+</button>
      <br />
      <button onClick={decreaseCount} >-</button>
      <span>Count: {count}</span>
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



    </div>
  );
}

export default Counter;
