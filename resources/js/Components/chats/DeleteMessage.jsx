import { useModalContext } from '@/Contexts/modal-context'
import clsx from 'clsx';
import React from 'react'
import { BsTrash } from 'react-icons/bs'

export default function DeleteMessage({ message, className }) {
    const { openModal } = useModalContext();

    const deleteConfirmation = () => {
        
    }

    return (
        <div
            className={clsx(
                "invisible flex flex-shrink-0 gap-2 group-hover:visible group-focus:visible",
                className,
            )}
        >
            <button
                type="button"
                className="btn btn-secondary rounded-full p-2"
                onClick={deleteConfirmation}
            >
                <BsTrash />
            </button>
        </div>
    )
}
