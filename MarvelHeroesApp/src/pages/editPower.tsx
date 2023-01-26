import React, {useEffect, useReducer, useState} from "react";
import {PowerFormActionType, powerFormReduce} from "../lib/reducers/powerForm.reducer";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {NiceInput} from "../components/niceInput";
import {Layout} from "./layout";
import {NiceTextArea} from "../components/niceTextArea";
import {SubmitButton} from "../components/submitButton";

export function EditPower() {
    const navigate = useNavigate();
    let {id} = useParams();

    const [powerLoaded, setPowerLoaded] = useState(false);
    const [powerFormState, dispatch] = useReducer(powerFormReduce, {
        name: "",
        description: "",
    });

    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("/api/powers/" + id);
                dispatch({
                    type: PowerFormActionType.SetPowers,
                    payload: result.data
                });
                setPowerLoaded(true);
            } catch (e) {
                navigate("/powers");
            }
        })()
    }, []);

    const handleEdit = async () => {
        const result = await axios.put("/api/powers", powerFormState);
        console.log(result);
    };

    return (
        <Layout className={"flex-col items-center"}>
            <h1>Modify Power 🔬🧫</h1>
            {!powerLoaded ? "Loading..." : (
                <div className="flex flex-col">
                    <div className="self-center w-full">
                        <NiceInput type={"text"} label="Power Name" value={powerFormState.name}
                                   onChange={(e) =>
                                       dispatch({
                                           type: PowerFormActionType.InputChange,
                                           payload: {propertyName: 'name', value: e.target.value}
                                       })} required={true}
                                   placeholder="Power Name"/>

                        <NiceTextArea label="Description" value={powerFormState.description}
                                      onChange={(e) =>
                                          dispatch({
                                              type: PowerFormActionType.InputChange,
                                              payload: {propertyName: 'description', value: e.target.value}
                                          })}
                                      required={false} placeholder="Description"/>
                    </div>
                    <SubmitButton label={"Update this Power ✨"} onSubmit={handleEdit}/>
                    <button className="mt-2 bg-red-700" onClick={() => navigate(`/powers/${id}/delete`)}>Remove 🗑️
                    </button>
                    <button className="mt-10" onClick={() => navigate("/heroes/new")}>Create more Heroes 🧬💪</button>
                    <button className="mt-10" onClick={() => navigate("/powers/new")}>Create more Powers 🧪</button>
                </div>
            )}
        </Layout>
    );
}
