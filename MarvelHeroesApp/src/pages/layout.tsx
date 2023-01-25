import '../App.css'

interface Props {
    children?: any;
}

export function Layout({children}: Props) {
    return (
        <div className="App">
            {...children}
        </div>
    )
}