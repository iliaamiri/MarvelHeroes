import React, {useEffect, useState} from 'react'
import './App.css'
import {Hero} from "./lib/models"
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Layout} from './pages/layout'
import {ListHeroes} from "./components/listHeroes";

function App() {
    const [heroes, setHeroes] = useState<Null<Hero[]>>(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/heroes")
            setHeroes(result.data)
        })()
    }, [])

    return (
        <Layout className={"flex-col items-center"}>
            <h1>Marvel Heroes</h1>
            <div className="card w-full flex flex-col gap-2">
                <button onClick={() => navigate("/powers")}>All Powers 💪</button>
                <button onClick={() => navigate("/heroes/new")}>New Hero 🦸‍♀️</button>

                {heroes === null ? "Loading..." : <ListHeroes heroes={heroes}/>}
            </div>
        </Layout>
    )
}

export default App
