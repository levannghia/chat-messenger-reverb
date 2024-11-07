import Modal from "@/Components/Modal";
import Preferences from "@/Components/modals/Preferences";
import { createContext, useContext, useReducer } from 'react';

const initialState = {
    isOpen: false,
    openModal: () => { },
    closeModal: () => { }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'OPEN':
            return {
                ...state,
                view: action.view,
                size: action.size,
                data: action.payload,
                isOpen: true,
                dispatchOnCanceled:
                    action.payload &&
                    action.payload.dispatchOnCanceled &&
                    action.payload.dispatchOnCanceled,
            }
        case 'CLOSE':
            return {
                ...state,
                view: undefined,
                size: undefined,
                data: undefined,
                isOpen: false,
                dispatchOnCanceled: undefined,
            };
    }
}

const ModalContext = createContext(initialState);

export function useModalContext() {
    return useContext(ModalContext);
}

export const ModalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const openModal = ({ view, size, payload }) => dispatch({ type: 'OPEN', view, size, payload })
    const closeModal = () => dispatch({ type: 'CLOSE' })

    const value = {
        ...state,
        openModal,
        closeModal,
    }

    // console.log(state);

    return (
        <ModalContext.Provider value={value}>
            {children}
            <ModalChildren />
        </ModalContext.Provider>
    )
}

export const ModalChildren = () => {
    const { isOpen, view, size, closeModal, dispatchOnCanceled } = useModalContext();
    const handleOnClose = () => {
        if (dispatchOnCanceled && typeof dispatchOnCanceled === 'function') {
            dispatchOnCanceled();
        }

        closeModal();
    }

    return (
        <Modal show={isOpen} onClose={handleOnClose} maxWidth={size}>
            {view === "PREFERENCES" && <Preferences />}
        </Modal>
    )
}