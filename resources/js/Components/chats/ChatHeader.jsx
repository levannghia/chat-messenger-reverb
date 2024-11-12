import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import BadgeOnline from './BadgeOnline'
import { Link, usePage } from '@inertiajs/react'
import moment from 'moment';
import { BsThreeDots } from 'react-icons/bs';
import { useChatMessageStore } from '@/store/chatMessageStore';
import clsx from 'clsx';

export default function ChatHeader() {
    const { user, toggleSidebarRight, showSidebarRight } = useChatMessageStore();

    return (
        <div className='flex h-14 items-center justify-between border-b border-secondary p-2 shadow-sm'>
            <div className="flex items-center gap-2">
                <Link
                    href={route("chats.index")}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary sm:hidden"
                >
                    <FaArrowLeft />
                </Link>
                <div className="relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border border-secondary"
                    />
                    {user.is_online && <BadgeOnline className="!right-0" />}
                </div>
                <div className='leading-4'>
                    <h5 className='font-medium'>{user.name}</h5>
                    {user.chat_type === 'chats' &&
                        <span className='text-xs text-secondary-foreground'>{user.is_online ? 'Online' : moment(user.last_seen).format('DD/MM/YY H:mm')}</span>
                    }

                </div>

            </div>
            <button
                onClick={toggleSidebarRight}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary"
            >
                {showSidebarRight ? (
                    <div
                        className={clsx(
                            "rounded-full p-0.5 text-sm text-white",
                            !user.message_color && "bg-primary",
                        )}
                        style={{ background: user?.message_color }}
                    >
                        <BsThreeDots />
                    </div>
                ) : (
                    <BsThreeDots />
                )}
            </button>
        </div>
    )
}
