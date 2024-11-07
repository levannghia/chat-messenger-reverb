import clsx from 'clsx'
import React, { Fragment } from 'react'
import { BsX } from 'react-icons/bs'

const Modal = ({ className, children }) => {
    return (
        <div className={clsx('flex flex-col gap-4 p-4 text-foreground dark:bg-slate-900', className)}>
            {children}
        </div>
    )
}

const Header = ({ title, onClose }) => {
    return (
        <div className="flex items-center">
            <h2 className="text-lg font-medium">{title}</h2>
            <button className="btn btn-secondary btn-close ml-auto" onClick={onClose}>
                <BsX />
            </button>
        </div>
    )
}

const Body = ({className, as: Component = "div", children}) => {
    return Component === Fragment ? (
        <Fragment>{children}</Fragment>
    ) : (
        <Component className={className}>{children}</Component>
    )
}

const Footer = ({className, children}) => {
    return <div className={className}>{children}</div>
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal