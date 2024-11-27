import { deleteFileInChat } from '@/Api/chat-messages';
import { useChatMessageStore } from '@/store/chatMessageStore';
import React from 'react'
import { BsX } from 'react-icons/bs';

export default function DeleteSelectedFileInChat({ message, attachment }) {
    const {messages, setMessages} = useChatMessageStore();
    
    const deleteSelectedFile = () => {
        deleteFileInChat(message, attachment).then(() => {
            const updatedAttachments = message.attachments.filter((a) => a.file_name !== attachment.file_name);

            setMessages(messages.map((m) => {
                if(m.id === message.id) {
                    m.attachments = updatedAttachments;
                }

                return m
            }))
        })

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
