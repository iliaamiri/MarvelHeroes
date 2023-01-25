import { useEffect, useState } from 'react'
import './App.css'
import { Hero } from "./lib/models"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Layout } from './pages/layout'

function App() {
  const [count, setCount] = useState(0)
  const [heroes, setHeroes] = useState<Null<Hero>>(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/heroes")
      setHeroes(result.data)
    })()
  }, [])

  return (
    <Layout>
      <div>
      </div>
      <h1>Marvel Heroes</h1>
      <div className="card w-10 flex flex-col gap-2">
        <button onClick={() => navigate("/heroes/new")}>
          New Hero
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          All Powers
        </button>
      </div>
    </Layout>
  )
}

export default App
