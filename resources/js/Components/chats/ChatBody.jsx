import { useAppStore } from '@/store/appStore'
import { useChatMessageStore } from '@/store/chatMessageStore';
import moment from 'moment';
import React, { useState } from 'react'
import ChatMessages from './ChatMessages';
import SaveOrBlockContent from './SaveOrBlockContent';

export default function ChatBody({
  chatContainerRef,
  bottomRef,
  scrollToBottom,
  onDrop,
}) {
  const { auth } = useAppStore();
  const { user } = useChatMessageStore();

  return !onDrop && (
    <div className='relative max-h-[100vh_-_120px] flex-1 overflow-auto p-2 pt-8' ref={chatContainerRef}>
      <div className='justify-center items-center flex flex-col text-center'>
        <div className='picture'>
          <img
            src={user.avatar}
            alt={user.name}
            className='w-12 h-12 rounded-full border border-secondary'
          />
        </div>
        <div>
          <h5 className='mt-1 text-lg font-medium'>{user.name}</h5>
          {user.chat_type === 'group_chats' ? (
            <p className="text-sm text-secondary-foreground">
              {auth.id === user?.creator_id ? "You " : `${user?.creator.name} `}
              created group "{user.name}" <br />
              on {moment(user.created_at).format("DD/MM/YY ")}
              at {moment(user.created_at).format("H:mm")}
            </p>
          ) : (
            <p className="text-sm text-secondary-foreground">
              Join <br /> on {moment(user.created_at).format("DD/MM/YY ")}
              at {moment(user.created_at).format("H:mm")}
            </p>
          )}
        </div>
      </div>
      <ChatMessages/>
      <div ref={bottomRef} className='h-0'/>
      <SaveOrBlockContent/>
    </div>
  )
}
