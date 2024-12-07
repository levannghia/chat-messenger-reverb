import { useChatMessageStore } from '@/store/chatMessageStore';
import clsx from 'clsx';
import React, { useState } from 'react'
import ProfileInfomation from './ProfileInfomation';
import Attachments from './Attachments';

export default function SidebarRight() {
    const { showSidebarRight } = useChatMessageStore();
    const [toggleCustomizeChat, setToggleCustomizeChat] = useState(false);
    const [toggleShowMedia, setToggleShowMedia] = useState(false);

    return (
        <div
            className={clsx(
                "relative order-4 h-full overflow-x-hidden border-secondary sm:flex-1 sm:border-l lg:w-[320px] lg:flex-initial xl:w-[360px]",
                showSidebarRight ? "flex" : "hidden",
            )}
        >
            <ProfileInfomation
                setToggleCustomizeChat={setToggleCustomizeChat}
                toggleCustomizeChat={toggleCustomizeChat}
                toggleShowMedia={toggleShowMedia}
                setToggleShowMedia={setToggleShowMedia}
            />
            <Attachments
                toggleShowMedia={toggleShowMedia}
                setToggleShowMedia={setToggleShowMedia}
            />
        </div>
    )
}
