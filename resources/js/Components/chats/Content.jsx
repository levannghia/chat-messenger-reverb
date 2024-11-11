import clsx from 'clsx'
import React from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useAppStore } from '@/store/appStore'

export default function Content() {
    // const { auth } = useAppStore();
    return (
        <div className={clsx('relative order-3 flex h-full w-full flex-1 flex-col justify-between overflow-x-hidden sm:border-1 border-secondary sm:border-l')}>
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </div>
    )
}
