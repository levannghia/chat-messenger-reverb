import React, { useRef } from 'react'
import Dropdown, { useDropdownContext } from '../Dropdown'
import clsx from 'clsx';
import { BsArchive, BsBan, BsBoxArrowRight, BsCheck2, BsThreeDots, BsXLg } from 'react-icons/bs';
import { useAppStore } from '@/store/appStore';
import { useChatStore } from '@/store/useChatStore';
import { archiveChat, maskAsRead, maskAsUnread } from '@/Api/chats';
import { useModalContext } from '@/Contexts/modal-context';
import { unblockContact } from '@/Api/contact';
import { useChatMessageStore } from '@/store/chatMessageStore';

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
    const { chats, setChats, refetchChats } = useChatStore();
    const { openModal } = useModalContext();
    const { auth } = useAppStore();
    const { user, setUser } = useChatMessageStore();
    const { open } = useDropdownContext();
    const dropdownRef = useRef(null);
    const dropdownPosition = (dropdownRef.current?.getBoundingClientRect().bottom || 0) < window.innerHeight - 100

    const handleMarkAsRead = () => {
        maskAsRead(chat).then(() => {
            setChats(chats.map((c) => {
                if (c.id === chat.id) {
                    c.is_read = true
                }

                return c;
            }))
        })
    }
    const handleMarkAsUnread = () => {
        maskAsUnread(chat).then(() => {
            setChats(chats.map((c) => {
                if (c.id === chat.id) {
                    c.is_read = false
                }

                return c;
            }))
        })
    }
    const handleArchiveChat = () => {
        archiveChat(chat).then(() => {
            refetchChats();
        })
    }

    const handleUnblockContact = () => {
        unblockContact(chat.id).then(() => {
            setChats(
                chats.map((c) => {
                    if (c.id === chat.id) {
                        c.is_contact_blocked = false;
                    }

                    return c;
                })
            )

            if (user && user.id === chat.id) {
                setUser({ ...user, is_contact_blocked: false })
            }
        })
    }

    const deleteChatConfirmation = () => {
        openModal({
            view: 'DELETE_CHAT_CONFIRMATION',
            size: 'lg',
            payload: chat
        })
    }

    const blockContactConfirmation = () => {
        openModal({
            view: 'BLOCK_CONTACT_CONFIRMATION',
            size: 'lg',
            payload: chat
        })
    }

    const exitGroupConfirmation = () => {
        openModal({
            view: "EXIT_GROUP_CONFIRMATION",
            size: "lg",
            payload: chat,
        });
    };

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
                    <Dropdown.Button onClick={chat.is_read ? handleMarkAsUnread : handleMarkAsRead}>
                        <div className='flex items-center gap-2'>
                            <BsCheck2 className='-ml-1 text-lg' />
                            Mark as {chat.is_read ? "Unread" : "Read"}
                        </div>
                    </Dropdown.Button>
                )}

                <Dropdown.Button onClick={handleArchiveChat}>
                    <div className='flex items-center gap-2'>
                        <BsArchive className='-ml-1 text-lg' />
                        Archive Chat
                    </div>
                </Dropdown.Button>
                <Dropdown.Button onClick={deleteChatConfirmation}>
                    <div className='flex items-center gap-2'>
                        <BsXLg className='-ml-1 text-lg' />
                        Delete Chat
                    </div>
                </Dropdown.Button>
                {auth.id !== chat.id && chat.chat_type === 'chats' && (
                    <>
                        <hr className="my-2 border-secondary" />

                        <Dropdown.Button
                            onClick={
                                chat.is_contact_blocked
                                    ? handleUnblockContact
                                    : blockContactConfirmation
                            }
                        >
                            {chat.is_contact_blocked ? (
                                <div className="flex items-center gap-2 text-success">
                                    <BsBan />
                                    Unblock Contact
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-danger">
                                    <BsBan />
                                    Block Contact
                                </div>
                            )}
                        </Dropdown.Button>
                    </>
                )}

                {auth.id !== chat.id && chat.chat_type === 'group_chats' && (
                    <>
                        <hr className="my-2 border-secondary" />
                        <Dropdown.Button onClick={exitGroupConfirmation}>
                            <div className="flex items-center gap-2 text-danger">
                                <BsBoxArrowRight />
                                Exit Group
                            </div>
                        </Dropdown.Button>
                    </>
                )}
            </Dropdown.Content>
        </div>
    )
}
