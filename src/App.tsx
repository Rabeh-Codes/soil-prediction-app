import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-green-500">
          <h1 className="text-4xl font-bold text-white shadow-lg">Tailwind is working ✅</h1>
        </div>
      </div>
      <div className="text-3xl font-bold text-blue-600">hello tailwind</div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
