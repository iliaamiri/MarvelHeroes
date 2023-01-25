import '../App.css'

interface Props {
    children?: any;
    className?: string;
}

export function Layout({children, className}: Props) {
    return (
        <div className={"App flex " + className}>
            {...children}
        </div>
    )
}
