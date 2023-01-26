import {useNavigate, useParams} from "react-router-dom";
import {Hero, Power} from "../lib/models";
import React from "react";
import axios from "axios";
import {Layout} from "./layout";

export function DeletePower() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [power, setPower] = React.useState<Null<Power>>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`/api/powers/${id}`);
                setPower(result.data);
            } catch (e) {
                navigate("/powers");
            }
        })();
    }, []);

    const handleDelete = async () => {
        await axios.delete(`/api/powers/${id}`);
        navigate("/");
    };

    return power === null ? <p>Loading...</p> : (
        <Layout className={"flex-col items-center"}>
            <h1>Are you sure you want to throw away the <b>{power.name}</b> power?</h1>
            <button className={"mt-10 bg-red-700"} onClick={handleDelete}>Remove from Existence 🗑️</button>
        </Layout>
    );
}
