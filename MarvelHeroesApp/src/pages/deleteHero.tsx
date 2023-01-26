import {useNavigate, useParams} from "react-router-dom";
import {Hero} from "../lib/models";
import React from "react";
import axios from "axios";
import {Layout} from "./layout";

export function DeleteHero() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [hero, setHero] = React.useState<Null<Hero>>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const result = await axios.get(`/api/heroes/${id}`);
                setHero(result.data);
            } catch (e) {
                navigate("/");
            }
        })();
    }, []);

    const handleDelete = async () => {
        await axios.delete(`/api/heroes/${id}`);
        navigate("/");
    };

    return hero === null ? <p>Loading...</p> : (
        <Layout className={"flex-col items-center"}>
            <h1>Are you sure you want to delete <b>{hero.heroName}</b>?</h1>
            <button className={"mt-10 bg-red-700"} onClick={handleDelete}>Delete 💀</button>
        </Layout>
    );
}
