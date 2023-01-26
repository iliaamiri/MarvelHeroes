import axios, {all} from "axios";
import React, {useEffect, useReducer, useState} from "react";
import {Power} from "../lib/models";
import {Layout} from "./layout";
import '../index.css'
import {NiceInput} from "../components/niceInput";
import {CreateHeroPayload} from "../lib/dtos";
import {useNavigate} from "react-router-dom";
import {HeroFormActionType, heroFormReduce} from "../lib/reducers/heroForm.reducer";
import {SubmitButton} from "../components/submitButton";

function CreateHero() {
    const navigate = useNavigate();
    const [allPowers, setAllPowers] = useState<Null<Power[]>>(null);

    const [newHero, dispatch] = useReducer(heroFormReduce, {
        heroName: "",
        secretIdentity: "",
        gender: "",
        birthDate: new Date(),
        firstAppearance: new Date(),
        powersIds: [],
    });

    const handleCreate = async () => {
        const response = await axios.post("/api/heroes", newHero);
        console.log(response.data, response);
        navigate(`/heroes/${response.data.id}/edit`);
    };

    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/powers")
            setAllPowers(result.data)
        })()
    }, []);

    return (
        <Layout className={"flex-col items-center"}>
            <h1>New Hero 🦸</h1>
            {(allPowers === null) ? "Loading Powers..." : (
                <div className="flex flex-col">
                    <div className="self-center w-4/12">
                        <NiceInput type={"text"} label="Hero Name" value={newHero.heroName}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'heroName', value: e.target.value}
                                       })} required={true}
                                   placeholder="Hero Name"/>

                        <NiceInput type={"text"} label="Secret Identity" value={newHero.secretIdentity}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'secretIdentity', value: e.target.value}
                                       })}
                                   required={false} placeholder="Secret Identity"/>

                        <NiceInput type={"text"} label="Gender" value={newHero.gender}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'gender', value: e.target.value}
                                       })} required={true}
                                   placeholder="Gender"/>

                        <NiceInput type={"date"} label="Birth Date" value={newHero.birthDate.toString()}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'birthDate', value: e.target.value}
                                       })} required={true}
                                   placeholder="Birth Date"/>
                        <NiceInput type={"date"} label="First Appearance" value={newHero.firstAppearance.toString()}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'firstAppearance', value: e.target.value}
                                       })}
                                   required={true} placeholder="First Appearance"/>
                    </div>

                    <p className="text-5xl m-10">Powers:</p>
                    <div className="flex flex-row flex-wrap">
                        {allPowers.map(power => (
                            <div key={`power${power.id}`} className="flex-1">
                                <label className="font-bold">{power.name}</label>
                                <div className="flex flex-col justify-between align-center pt-5">
                                    <input
                                        className="h-7 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        type="checkbox" name={power.name}
                                        checked={newHero.powersIds.indexOf(power.id) > -1}
                                        onChange={(e) =>
                                            dispatch({
                                                type: HeroFormActionType.PowerChange,
                                                payload: {powerId: power.id, checked: e.target.checked}
                                            })}/>
                                    <p className="mt-5">{power.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <SubmitButton label={"Create this Hero 💥"} onSubmit={handleCreate} />
                    <button className="mt-10" onClick={() => navigate("/powers/new")}>Create more Powers 💪</button>
                </div>
            )}
        </Layout>
    )
}

export default CreateHero;
