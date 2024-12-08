import { useModalContext } from '@/Contexts/modal-context'
import { useChatMessageStore } from '@/store/chatMessageStore';
import React, { useState } from 'react'
import Modal from "@/components/modals/Modal";
import clsx from 'clsx';

export default function CustomizeChat() {
    const { closeModel } = useModalContext();
    const { user, setUser } = useChatMessageStore();
    const [ selectedColor, setSelectedColor ] = useState(null);

    const colors = [
        "#2863EB",
        "#2196F3",
        "#00BCD4",
        "#3F51B5",
        "#673AB7",
        "#9C27B0",
        "#F25C55",
        "#FFC107",
        "#FF9800",
        "#ff2522",
        "#4CAF50",
        "#ED9F9B",
    ];

    const handleOnClose = () => {
        closeModel()
    }

    const saveMessageColor = () => {

    }

    const changeMessageColor = (color) => {
        setSelectedColor(color);
        setUser({...user, message_color: color});
        console.log(user);
        
    }

    return (
        <Modal>
            <Modal.Header title={"Themes"} onClose={handleOnClose} />
            <Modal.Body className="grid grid-cols-4 gap-2">
                {colors.map((color, index) => (
                    <button
                        className={clsx(
                            "flex h-20 w-20 items-center justify-center rounded-2xl p-2 hover:bg-secondary focus:bg-secondary",
                            color === selectedColor && "bg-secondary",
                        )}
                        key={index}
                        onClick={() => changeMessageColor(color)}
                    >
                        <span
                            className="inline-block h-16 w-16 shrink-0 rounded-full"
                            style={{ background: color }}
                        />
                    </button>
                ))}
            </Modal.Body>
            <Modal.Footer className="flex justify-between gap-4">
                <button className="btn btn-secondary flex-1" onClick={handleOnClose}>
                    Cancel
                </button>
                <button className="btn btn-primary flex-1" onClick={saveMessageColor}>
                    Save
                </button>
            </Modal.Footer>
        </Modal>
    )
}
