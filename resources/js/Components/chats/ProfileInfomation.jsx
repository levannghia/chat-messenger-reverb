import { useModalContext } from '@/Contexts/modal-context';
import { useChatMessageStore } from '@/store/chatMessageStore'
import React from 'react'

export default function ProfileInfomation({
    toggleCustomizeChat,
    toggleShowMedia,
    setToggleCustomizeChat,
    setToggleShowMedia,
}) {
    const {user, setUser, showSidebarRight, toggleSidebarRight} = useChatMessageStore();
    const { openModal } = useModalContext();

    return (
        <div>ProfileInfomation</div>
    )
}
