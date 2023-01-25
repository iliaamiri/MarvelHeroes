import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Hero, Power } from "../lib/models";
import { Layout } from "./layout";
import '../index.css'
import { NiceInput } from "../components/niceInput";

function CreateHero() {
    let { id } = useParams();

    const [allPowers, setAllPowers] = useState<Null<Power[]>>(null)

    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/powers")
            setAllPowers(result.data)
        })()
    }, [])

    return (
        <Layout>
            <h1>New Hero 🦸</h1>
            {(allPowers === null) ? "Loading Powers..." : (
                <div className="flex flex-col">
                    <div className="self-center w-4/12">
                        <NiceInput type={"text"} label="Hero Name" onChange={''} required={true} placeholder="Hero Name" />
                        <NiceInput type={"text"} label="Secret Identity" onChange={''} required={false} placeholder="Secret Identity" />
                        <NiceInput type={"text"} label="Gender" onChange={''} required={true} placeholder="Gender" />
                        <NiceInput type={"date"} label="Birth Date" onChange={''} required={true} placeholder="Birth Date" />
                        <NiceInput type={"date"} label="First Appearance" onChange={''} required={true} placeholder="First Appearance" />
                    </div>

                    <p className="text-5xl m-10">Powers:</p>
                    <div className="flex flex-row flex-wrap">
                        {allPowers.map(power => (
                            <div className="flex-1">
                                <label className="font-bold">{power.name}</label>
                                <div className="flex flex-col justify-between align-center pt-5">
                                    <input className="h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" id="vehicle1" name={power.name} value={power.id} />
                                    <p className="mt-5">{power.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-10">Create Hero 💥</button>
                    <button className="mt-10">Create more Powers 💪</button>
                </div>
            )}
        </Layout>
    )
}
export default CreateHero;