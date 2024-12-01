import React, { Fragment } from 'react'
import Modal from "@/components/modals/Modal";
import { useModalContext } from '@/Contexts/modal-context'
import { useChatStore } from '@/store/useChatStore';
import { deleteMessage } from '@/Api/chat-messages';
import { useChatMessageStore } from '@/store/chatMessageStore';
import { deleteChat } from '@/Api/chats';
import { router } from '@inertiajs/react';

export default function DeleteChatConfirmation() {
    const { closeModal, data: chat } = useModalContext();
    const { chats, setChats } = useChatStore();
    const { refetchChats } = useChatStore();

    if (!chat) return

    const handleDeleteChat = () => {
        deleteChat(chat).then(() => {
            refetchChats();
            setChats([...chats.filter((m) => m.id !== chat.id)]);

            closeModal();
            router.replace(route("chats.index"));
        })
    }

    return (
        <Modal>
            <Modal.Header title="Delete Message?" onClose={closeModal} />
            <Modal.Body as={Fragment}>
                <p>
                    This chat will be removed for you, including the files. Others in the
                    chat will still be able to see it.
                </p>
            </Modal.Body>

            <Modal.Footer className="flex justify-between gap-4">
                <button className="btn btn-secondary flex-1" onClick={closeModal}>
                    Cancel
                </button>
                <button className="btn btn-danger flex-1" onClick={handleDeleteChat}>
                    Delete for me
                </button>
            </Modal.Footer>
        </Modal>
    )
}
