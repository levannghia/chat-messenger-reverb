import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx';
import React, { useEffect } from 'react'
import BadgeOnline from './BadgeOnline';
import { relativeTime } from '@/utils';
import { useChatStore } from '@/store/useChatStore';
import { useChatContext } from '@/Contexts/chat-context';
import BadgeNotification from './BadgeNotification';
import { fetchChatsInPaginate, maskAsRead } from '@/Api/chats';
import ChatListAction from './ChatListAction';
import { useInView } from "react-intersection-observer";
import { BsArrowClockwise } from 'react-icons/bs';

export default function ChatList({ search, href, className }) {
    const { chats, setChats, setPaginate, paginate } = useChatStore();
    const { ref:loadMoreRef, inView, entry } = useInView();

    const handleMarkAsRead = (chat) => {
        !chat.is_read && maskAsRead(chat)
    }

    useEffect(() => {
        if(inView && loadMoreRef.length > 0) {
            if(paginate.next_page_url){
                fetchChatsInPaginate(paginate.next_page_url).then((response) => {
                    setPaginate(response.data.data);
                    setChats([...chats, ...response.data.data.data]);
                })
            }
        }
        
    }, [inView, paginate])

    if (chats.length === 0) return;

    return (
        <div className='relative max-h-[calc(100vh_-_158px)] flex-1 overflow-y-auto px-2 sm:max-h-max sm: pb-2'>
            {chats.sort((a, b) => {
                if (search.length === 0) {
                    return b.created_at?.localeCompare(a.created_at);
                }

                return a.name.localeCompare(b.name);
            })
                .map((chat) => (
                    <div className='group relative flex items-center' key={chat.id}>
                        <Link
                            as='button'
                            href={route(href, chat.id)}
                            onClick={() => handleMarkAsRead(chat)}
                            className={clsx(
                                "relative flex w-full flex-1 items-center gap-3 rounded-lg p-3 text-left transition-all group-hover:bg-secondary",
                                route().current(href, chat.id) && "bg-secondary",
                                chat.is_contact_blocked && "opacity-25",
                            )}>
                            {search.length === 0 && chat.created_at ? (
                                <>
                                    <div className='relative shrink-0'>
                                        <img src={chat.avatar} alt={chat.name} className='w-12 h-12 rounded-full border border-foreground' />
                                        {chat.is_online && <BadgeOnline />}
                                    </div>
                                    <div className='overflow-hidden'>
                                        <h5 className='truncate font-medium'>{chat.name}</h5>
                                        <div className="flex items-center text-sm text-secondary-foreground">
                                            <p
                                                className={clsx(
                                                    "truncate",
                                                    !chat.is_read && "font-medium text-foreground",
                                                    route().current(href, chat.id) && "!text-foreground",
                                                )}
                                                dangerouslySetInnerHTML={{ __html: chat.body }}
                                            />
                                            <span className="mx-1">.</span>
                                            <span className="shrink-0">
                                                {relativeTime(chat.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="relative shrink-0">
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className="h-10 w-10 rounded-full border border-secondary"
                                        />
                                        {chat.is_online && <BadgeOnline />}
                                    </div>

                                    <div className="overflow-hidden">
                                        <h5 className="truncate font-medium">{chat.name}</h5>
                                    </div>
                                </>
                            )}

                        </Link>
                        {chat.body && <ChatListAction chat={chat} />}
                        {!chat.is_read && <BadgeNotification />}
                    </div>
                ))}
                {paginate.next_page_url && (
                    <button className='mx-auto mt-4 flex' ref={loadMoreRef}>
                        <BsArrowClockwise className='animate-spin text-2xl text-secondary-foreground'/>
                    </button>
                )}
        </div>
    )
}
