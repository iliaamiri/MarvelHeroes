import {useNavigate} from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <div className={"flex w-full mb-10"}>
            <button className="justify-self-start self-start" onClick={() => navigate(-1)}>◀️ Back</button>
        </div>
    )
}
