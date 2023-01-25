import {Hero} from "../lib/models";
import {useNavigate} from "react-router-dom";

interface ListHeroesProps {
    heroes: Hero[];
}

export function ListHeroes({heroes}: ListHeroesProps) {
    const navigate = useNavigate();

    return (
        <>
            {
                heroes.map((hero) => (
                        <div key={hero.id} className="flex flex-col border-2 rounded p-5 flex flex-col mt-5">
                            <p><b>Hero Name:</b> {hero.heroName}</p>
                            <p><b>Real Name:</b> {hero.secretIdentity ?? "SECRET"}</p>
                            <p><b>Gender:</b> {hero.gender}</p>
                            <p><b>First Appearance:</b> {new Date(hero.firstAppearance).toLocaleDateString()}
                            </p>
                            <p><b>Birth Date:</b> {new Date(hero.birthDate).toLocaleDateString()}</p>
                            <button className={"mt-2"}>Checkout their Powers! 🙀</button>
                            <div className={"mt-5 flex justify-between"}>
                                <button onClick={() => navigate(`/heroes/${hero.id}/edit`)}>Edit 🧬</button>
                                <button className={"bg-red-700"} onClick={() => navigate(`/heroes/${hero.id}/delete`)}>Delete 💀</button>
                            </div>
                        </div>
                    )
                )
            }
        </>
    );
}
