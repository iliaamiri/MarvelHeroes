import '../App.css'
import {NavBar} from "../components/navBar";

interface Props {
    children?: any;
    className?: string;
}

export function Layout({children, className}: Props) {
    return (
        <div className={"App flex " + className}>
            <NavBar />
            {...children}
        </div>
    )
}
