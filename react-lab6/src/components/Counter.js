import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => { if (count > 0) setCount(count - 1); };
  const reset = () => setCount(0);

  return (
    <div className="page">
      <h1>Counter App</h1>
      <div className="counter-box">
        <div className="count">{count}</div>
        <button className="btn-inc" onClick={increment}>Increment</button>
        <button className="btn-dec" onClick={decrement}>Decrement</button>
        <button className="btn-reset" onClick={reset}>Reset</button>
        {count === 0 && <p style={{ marginTop: '12px', color: '#999' }}>Count cannot go below 0</p>}
      </div>
    </div>
  );
}

export default Counter;
