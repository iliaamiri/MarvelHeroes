import React from "react";

interface Props {
    label: string;
    value?: string;
    placeholder: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    required: boolean;
}

export function NiceTextArea({ label, value = "", placeholder, onChange, required }: Props) {
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea onChange={onChange} value={value} className="bg-gray-50 border h-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required={required} />
        </div>
    )
}
