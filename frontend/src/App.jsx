import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-900">
      <div className="flex gap-6 mb-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-20 hover:scale-110 transition" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-20 hover:scale-110 transition" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold mb-6">Vite + React + Tailwind</h1>

      <div className="bg-black shadow-md p-6 rounded-xl flex flex-col items-center gap-4">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          count is {count}
        </button>

        <p className="text-gray-600">
          Edit <code className="px-1 py-0.5 bg-gray-200 rounded">src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
