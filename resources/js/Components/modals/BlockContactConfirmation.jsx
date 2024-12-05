import React, { Fragment } from 'react'
import Modal from '@/Components/modals/Modal';
import { useModalContext } from '@/Contexts/modal-context';
import { useAppStore } from '@/store/appStore';
import { useChatMessageStore } from '@/store/chatMessageStore';
import { blockContact } from '@/Api/contact';
import { useChatStore } from '@/store/useChatStore';

export default function BlockContactConfirmation() {
    const {closeModal, data: chat} = useModalContext();
    const { chats, setChats } = useChatStore();
    const { user, setUser } = useChatMessageStore();

    if(!chat) return;

    const handleblockContact = () => {
        blockContact(chat.id).then(() => {
            if(route().current("chats.*")) {
                setChats(
                    chats.map((c) => {
                        if(c.id === chat.id) {
                            c.is_contact_blocked = true;
                        }

                        return c;
                    })
                );

                if(user?.id === chat.id) {
                    setUser({...user, is_contact_blocked: true})
                }
            } else {

            }

            closeModal()
        })
    }

    return (
        <Modal>
          <Modal.Header title="Block Contact?" onClose={closeModal} />
          <Modal.Body as={Fragment}>
            <p>
              This contact will be removed from your contacts. You can save the
              contact once you open again the block.
            </p>
          </Modal.Body>
    
          <Modal.Footer className="flex justify-between gap-4">
            <button className="btn btn-secondary flex-1" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-danger flex-1" onClick={handleblockContact}>
              Block
            </button>
          </Modal.Footer>
        </Modal>
      );
}
