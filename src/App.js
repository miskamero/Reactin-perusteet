import React, { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <button onClick={() => setCounter( counter + parseInt(prompt("Anna luku")))}>+</button>
      <button onClick={() => setCounter( counter - parseInt(prompt("Anna luku")))}>-</button>
      <button onClick={() => setCounter(0)}>Nollaa</button>
      <p>Luku: {counter}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Interaktiivinen laskuri</h1><br/>
      <Counter />
    </div>
  );
};

export default App;
