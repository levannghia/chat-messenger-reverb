import Modal from "@/Components/Modal";
import AddNewGroup from "@/Components/modals/AddNewGroup";
import BlockContactConfirmation from "@/Components/modals/BlockContactConfirmation";
import CustomizeChat from "@/Components/modals/CustomizeChat";
import DeleteChatConfirmation from "@/Components/modals/DeleteChatConfirmation";
import DeleteMessageConfirmation from "@/Components/modals/DeleteMessageConfirmation";
import EditGroup from "@/Components/modals/EditGroup";
import ExitGroupConfirmation from "@/Components/modals/ExitGroupConfirmation";
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
            {view === "DELETE_MESSAGE_CONFIRMATION" && <DeleteMessageConfirmation />}
            {view == "DELETE_CHAT_CONFIRMATION" && <DeleteChatConfirmation/>}
            {view == "BLOCK_CONTACT_CONFIRMATION" && <BlockContactConfirmation/>}
            {view == "CUSTOMIZE_CHAT" && <CustomizeChat/>}
            {view == "ADD_NEW_GROUP" && <AddNewGroup/>}
            {view == "EDIT_GROUP" && <EditGroup/>}
            {view == "EXIT_GROUP_CONFIRMATION" && <ExitGroupConfirmation/>}
        </Modal>
    )
}