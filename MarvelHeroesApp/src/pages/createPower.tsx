import React, {useReducer} from "react";
import {PowerFormActionType, powerFormReduce} from "../lib/reducers/powerForm.reducer";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {NiceInput} from "../components/niceInput";
import {Layout} from "./layout";
import {NiceTextArea} from "../components/niceTextArea";
import {SubmitButton} from "../components/submitButton";

export function CreatePower() {
    const navigate = useNavigate();

    const [powerFormState, dispatch] = useReducer(powerFormReduce, {
        name: "",
        description: "",
    });

    const handleCreate = async () => {
        const result = await axios.post("/api/powers", powerFormState);
        navigate(`/powers/${result.data.id}/edit`);
    };

    return (
        <Layout className={"flex-col items-center"}>
            <h1>New Power! 🧪✨</h1>
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
                <SubmitButton label={"Create this Power 💥"} onSubmit={handleCreate} />
                <button className="mt-10" onClick={() => navigate("/heroes/new")}>Create more Heroes 🧬💪</button>
            </div>
        </Layout>
    );
}
