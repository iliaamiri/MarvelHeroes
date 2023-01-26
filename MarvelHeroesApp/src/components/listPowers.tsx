import {Power} from "../lib/models";
import {useNavigate} from "react-router-dom";

interface ListPowersProps {
    powers: Power[];
}

export function ListPowers({powers}: ListPowersProps) {
    const navigate = useNavigate();

    return (
        <>
            {powers.map((power) => (
                <div key={power.id} className="flex flex-col border-2 rounded p-5 flex flex-col mt-5">
                    <p><b className={"text-pink-700"}>Name:</b> {power.name}</p>
                    <p><b className={"text-violet-600"}>Description:</b> {power.description}</p>
                    <div className={"mt-5 flex justify-evenly"}>
                        <button onClick={() => navigate(`/powers/${power.id}/edit`)}>Edit 🧬</button>
                        <button className={"bg-red-700"} onClick={() => navigate(`/powers/${power.id}/delete`)}>Delete 🗑️</button>
                    </div>
                </div>
            ))}
        </>
    );
}
