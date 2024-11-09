import { useModalContext } from '@/Contexts/modal-context';
import clsx from 'clsx';
import React, { useState } from 'react'
import { FaUsers } from "react-icons/fa";
import ChatListSearch from './ChatListSearch';
import ChatList from './ChatList';

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const {openModal} = useModalContext();
  const addNewGroup = () => {
    openModal({
      view: 'PREFERENCES',
      size: 'lg'
    })
  }

  return (
    <div
      className={clsx(
        "order-1 flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]",
        route().current("chats.show") ? "hidden" : "flex",
      )}
    >
      <div className="flex items-center justify-between px-2 pt-2 sm:pb-0">
        <h3 className="text-2xl font-semibold">Chats</h3>
        <button
          className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
          onClick={addNewGroup}
        >
          <FaUsers />
        </button>
      </div>

      {/* Searching */}
      <ChatListSearch search={search} setSearch={setSearch}/>

      {/* Chat list */}
      <ChatList search={search} href={'chats.show'}/>

      {/* {chats.length === 0 && search.length > 0 && ( */}
        {/* <p className="flex h-full flex-1 items-center justify-center">
          User not found
        </p> */}
      {/* )} */}

      {/* {chats.length === 0 && search.length === 0 && ( */}
        {/* <p className="flex h-full flex-1 items-center justify-center">
          No chat yet
        </p> */}
      {/* )} */}
    </div>
  )
}
