import React from 'react'
import { BsX } from 'react-icons/bs';

export default function DeleteSelectedFileInChat({ message, attachment }) {
    const deleteSelectedFile = () => {

    }

    return (
        <button
            className="absolute right-1 top-1 z-10 hidden h-4 w-4 items-center justify-center rounded-full bg-danger text-white group-hover/attachment:flex"
            onClick={deleteSelectedFile}
        >
            <BsX />
        </button>
    );
}
