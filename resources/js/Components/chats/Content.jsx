import clsx from 'clsx'
import React, { useRef, useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { useAppStore } from '@/store/appStore'
import DragFileOverlay from './DragFileOverlay'
import PreviewOnDropFile from './PreviewOnDropFile'
import { useChatMessageStore } from '@/store/chatMessageStore'

export default function Content() {
    const { showSidebarRight } = useChatMessageStore();
    const chatContainerRef = useRef();
    const bottomRef = useRef();
    const [onDrag, setOnDrag] = useState(false);
    const [onDrop, setOnDrop] = useState(false);

    useEffect(() => {
        scrollToBottom();
    }, [])

    const scrollToBottom = () => {
        if (chatContainerRef.current && bottomRef.current) {
            chatContainerRef.current.scrollTop = bottomRef.current.offsetTop;
        }
    }

    const handleOnDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        console.log(files);

        if (files.length === 0) {
            return setOnDrag(false);
        }

        onSelectOrPreviewFiles(files);
    }

    const onSelectOrPreviewFiles = (files) => {
        if (!files) return
        setOnDrag(false);
        setOnDrop(true);
    }

    const closeOnPreview = () => {
        setOnDrop(false);
    }

    return (
        <div
            className={clsx(
                "relative order-3 h-full w-full flex-1 flex-col justify-between overflow-x-hidden border-secondary sm:border-l",
                showSidebarRight ? "hidden lg:flex" : "flex",
            )}
            tabIndex={0}
            onDragEnter={() => setOnDrag(true)}
            onDragExit={() => setOnDrag(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleOnDrop}
        >
            <ChatHeader onDrop={onDrop} closeOnPreview={closeOnPreview} />
            <ChatBody
                chatContainerRef={chatContainerRef}
                bottomRef={bottomRef}
                scrollToBottom={scrollToBottom}
                onDrop={onDrop}
            />
            <PreviewOnDropFile onDrop={onDrop} closeOnPreview={closeOnPreview} />
            <DragFileOverlay onDrag={onDrag} onDrop={onDrop} />
            <ChatFooter scrollToBottom={scrollToBottom} />
        </div>
    )
}
