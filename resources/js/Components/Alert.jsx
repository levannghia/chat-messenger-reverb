import React from 'react'
import clsx from 'clsx'
import { BsX } from "react-icons/bs";

function Alert({message, className}) {

    const closeAlert = () => {
        setErrorMsg(null);
        setSuccessMsg(null);
    };

    return (
        <div className="fixed bottom-16 left-2 right-2 z-[60] sm:bottom-auto sm:top-2">
            <div
                className={clsx(
                    "flex items-center gap-2 rounded-lg p-4 text-sm sm:ml-auto sm:max-w-lg",
                    className,
                )}
            >
                <p>{message}</p>
                <button
                    className="ml-auto text-xl opacity-70 transition-all hover:opacity-100"
                    onClick={closeAlert}
                >
                    <BsX />
                </button>
            </div>
        </div>
    );
}

export default Alert