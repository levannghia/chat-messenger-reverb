import React from 'react'
import Modal from '../Modal'
import { useModalContext } from '@/Contexts/modal-context'

export default function DeleteMessageConfirmation() {
    const { closeModal } = useModalContext()
    return (
        <Modal>
            <Modal.Header title="Delete Message" onClose={closeModal} />
        </Modal>
    )
}
