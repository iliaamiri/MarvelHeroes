import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useReducer, useState} from "react";
import {HeroFormActionType, heroFormReduce} from "../lib/reducers/heroForm.reducer";
import axios from "axios";
import {Power} from "../lib/models";
import {Layout} from "./layout";
import {NiceInput} from "../components/niceInput";
import {SubmitButton} from "../components/submitButton";

export function EditHero() {
    const navigate = useNavigate();
    let {id} = useParams();

    const [allPowers, setAllPowers] = useState<Null<Power[]>>(null);
    const [hero, dispatch] = useReducer(heroFormReduce, {
        heroName: "",
        secretIdentity: "",
        gender: "",
        birthDate: new Date(),
        firstAppearance: new Date(),
        powersIds: [],
    });

    useEffect(() => {
        (async () => {
            const powersResult = await axios.get("/api/powers");
            setAllPowers(powersResult.data);

            try {
                const heroesResult = await axios.get("/api/heroes/" + id);
                const hero = heroesResult.data;
                dispatch({
                    type: HeroFormActionType.SetHero, payload: {
                        ...hero,
                        createdAt: new Date(hero.createdAt).toLocaleDateString(),
                        updatedAt: new Date(hero.updatedAt).toLocaleDateString(),
                        birthDate: new Date(hero.birthDate).toLocaleDateString(),
                        firstAppearance: new Date(hero.firstAppearance).toLocaleDateString(),
                        powersIds: hero.powers.$values.map((p: Power) => p.id)
                    }
                });
            } catch (e) {
                navigate("/");
            }
        })()
    }, []);

    const handleEdit = async () => {
        const response = await axios.put("/api/heroes", {
            id: hero.id,
            heroName: hero.heroName,
            secretIdentity: hero.secretIdentity,
            gender: hero.gender,
            birthDate: new Date(hero.birthDate),
            firstAppearance: new Date(hero.firstAppearance),
            powersIds: hero.powersIds
        });
        console.log(response.data, response);
    };

    return (
        <Layout className={"flex-col items-center"}>
            <h1>Update Hero 🦸</h1>
            {(allPowers === null) ? "Loading Powers..." : (
                <div className="flex flex-col">
                    <div className="self-center w-4/12">
                        <NiceInput type={"text"} label="Hero Name" value={hero.heroName}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'heroName', value: e.target.value}
                                       })} required={true}
                                   placeholder="Hero Name"/>

                        <NiceInput type={"text"} label="Secret Identity" value={hero.secretIdentity}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'secretIdentity', value: e.target.value}
                                       })}
                                   required={false} placeholder="Secret Identity"/>

                        <NiceInput type={"text"} label="Gender" value={hero.gender}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'gender', value: e.target.value}
                                       })} required={true}
                                   placeholder="Gender"/>

                        <NiceInput type={"date"} label="Birth Date" value={hero.birthDate.toString()}
                                   onChange={(e) =>
                                       dispatch({
                                           type: HeroFormActionType.InputChange,
                                           payload: {propertyName: 'birthDate', value: e.target.value}
                                       })} required={true}
                                   placeholder="Birth Date"/>
                        <NiceInput type={"date"} label="First Appearance" value={hero.firstAppearance.toString()}
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
                                        checked={hero.powersIds.indexOf(power.id) > -1}
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
                    <SubmitButton label={"Update this Hero 🧬"} onSubmit={handleEdit} />
                    <button className={"mt-2 bg-red-700"} onClick={() => navigate(`/heroes/${hero.id}/delete`)}>Delete 💀</button>
                    <button className="mt-10" onClick={() => navigate("/powers/new")}>Create more Powers 💪</button>
                </div>
            )}
        </Layout>
    )
}
