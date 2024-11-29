import React, { useRef } from 'react'
import Dropdown, { useDropdownContext } from '../Dropdown'
import clsx from 'clsx';
import { BsArchive, BsCheck2, BsThreeDots, BsXLg } from 'react-icons/bs';
import { useAppStore } from '@/store/appStore';

export default function ChatListAction({ chat }) {
    return (
        <div className='absolute right-8 shrink-8'>
            <Dropdown>
                <Action chat={chat} />
            </Dropdown>
        </div>
    )
}

const Action = ({ chat }) => {
    const { auth } = useAppStore();
    const { open } = useDropdownContext();
    const dropdownRef = useRef(null);
    const dropdownPosition = (dropdownRef.current?.getBoundingClientRect().bottom || 0) < window.innerHeight - 100

    return (
        <div ref={dropdownRef}>
            <Dropdown.Trigger>
                <button
                    type="button"
                    className={clsx(
                        "rounded-full border border-secondary bg-background p-1.5 shadow-sm group-hover:visible group-hover:flex",
                        open ? "visible" : "invisible",
                    )}
                >
                    <BsThreeDots className="text-secondary-foreground" />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content
                align={dropdownPosition ? "right" : "top-right"}
                contentClasses={dropdownPosition ? "" : "mb-7"}
            >
                {auth.id !== chat.id && auth.id !== chat.from_id && (
                    <Dropdown.Button>
                        <div className='flex items-center gap-2'>
                            <BsCheck2 className='-ml-1 text-lg' />
                            Mark as {chat.is_read ? "Unread" : "Read"}
                        </div>
                    </Dropdown.Button>
                )}

                <Dropdown.Button>
                    <div className='flex items-center gap-2'>
                        <BsArchive className='-ml-1 text-lg' />
                        Archive Chat
                    </div>
                </Dropdown.Button>
                <Dropdown.Button>
                    <div className='flex items-center gap-2'>
                        <BsXLg className='-ml-1 text-lg' />
                        Delete Chat
                    </div>
                </Dropdown.Button>
            </Dropdown.Content>
        </div>
    )
}
