import { blockContact } from '@/Api/contact';
import { useAppStore } from '@/store/appStore'
import { useChatMessageStore } from '@/store/chatMessageStore';
import { useChatStore } from '@/store/useChatStore';
import React from 'react'
import { BsBan, BsCheckCircle } from 'react-icons/bs'

export default function SaveOrBlockContent() {
    const { auth } = useAppStore();
    const { chats, setChats } = useChatStore();
    const { user, messages, setUser } = useChatMessageStore();

    const handleBlockContact = () => {
        blockContact(user.id).then(() => {
            setUser({
                ...user,
                is_contact_blocked: true,
            });

            setChats(chats.map((c) => {
                if(c.id == user.id) {
                    c.is_contact_blocked = true;
                }

                return c;
            }))
        })
    }

    const handleSaveContact = () => {

    }

    return (
        user.chat_type === 'chats' && messages.length > 0 && !user.is_contact_saved && !user.is_contact_blocked && auth.id !== user.id && (
            <div className="my-2 flex flex-col items-center justify-between gap-2">
            <p>This contact not saved, would you like to save</p>
            <div className='flex gap-2'>
                <button className='btn btn-danger flex items-center gap-2 rounded-full' onClick={handleBlockContact}>
                    <BsBan /> Block
                </button>
                <button className='btn btn-success flex items-center gap-2 rounded-full' onClick={handleSaveContact}>
                    <BsCheckCircle /> Ok
                </button>
            </div>
        </div>
        )

        
        
    )
}
