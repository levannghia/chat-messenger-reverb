
import useChatMessageStore from '@/store/chatMessageStore'
import { usePage } from '@inertiajs/react'
import React, { useEffect } from 'react'

export default function ChatMessageProvider({children}) {
    const props = usePage().props;
    // const messages = useChatMessageStore(state => state.messages)
    // const setMessages = useChatMessageStore(state => state.setMessages)

    useEffect(() => {
        useChatMessageStore.getState().initialize(props)
    }, [])

    return (
        <>{children}</>
    )
}
