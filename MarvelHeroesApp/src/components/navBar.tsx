import {useNavigate} from "react-router-dom";

export function NavBar() {
    const navigate = useNavigate();
    return (
        <div className={"flex w-full justify-evenly mb-10"}>
            <button onClick={() => navigate(-1)}>◀️ Back</button>
            {window.location.pathname !== "/" && <button onClick={() => navigate("/")}>🏠 Home</button>}
        </div>
    )
}
