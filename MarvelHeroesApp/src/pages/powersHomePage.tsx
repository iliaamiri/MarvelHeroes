import React from "react";
import {useNavigate} from "react-router-dom";
import {Layout} from "./layout";
import {Power} from "../lib/models";
import axios from "axios";
import {ListPowers} from "../components/listPowers";

export function PowersHomePage() {
    const navigate = useNavigate();
    const [powers, setPowers] = React.useState<Null<Power[]>>(null);

    React.useEffect(() => {
        (async () => {
            const result = await axios.get("/api/powers");
            const powers = await result.data;
            setPowers(powers);
        })();
    }, []);

    return (
        <Layout className={"flex-col items-center"}>
            <h1>Lab 🧪</h1>
            {powers === null ? "Loading..." : (
                <div className={"card w-1/2 justify-self-center flex flex-col gap-2"}>
                    <button onClick={() => navigate("/")}>All Heroes 🦸‍♀️🦸</button>
                    <button onClick={() => navigate("/powers/new")}>New Power 🧬✒️️</button>

                    <ListPowers powers={powers}/>
                </div>
            )}
        </Layout>
    );
}
