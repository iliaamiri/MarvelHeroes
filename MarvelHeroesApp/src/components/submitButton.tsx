import React, {useReducer, useState} from "react";

interface Props {
    label: string;
    onSubmit: () => Promise<any>;
}

export function SubmitButton({onSubmit, label}: Props) {
    const [isSubmitting, setSubmitting] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setSubmitting(true);
        await onSubmit();
        setTimeout(() => {
            setSubmitting(false);
        }, 1000);
    };

    return (
        <button onClick={handleClick} className={`mt-10 transition-all duration-500 ${isSubmitting ? "bg-emerald-500" : ""}`}>
            {label}
        </button>
    );
}
