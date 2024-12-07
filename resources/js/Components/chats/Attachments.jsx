import { useChatMessageStore } from '@/store/chatMessageStore'
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';

export default function Attachments({ toggleShowMedia, setToggleShowMedia }) {
  const { showSidebarRight } = useChatMessageStore();

  return (
    <Transition
      show={toggleShowMedia}
      enter="transition-transform duration-300 ease-out"
      enterFrom="transform opacity-0 -translate-x-[-100%]"
      enterTo="transform opacity-100 translate-x-0"
      leave="transition-transform duration-300 ease-out"
      leaveFrom="transform opacity-100 translate-x-0"
      leaveTo="transform opacity-0 -translate-x-[-100%]"
      className={clsx(
        "absolute top-0 w-full lg:flex",
        showSidebarRight ? "flex" : "hidden",
      )}
    >
      <div className="sticky top-0 flex h-14 items-center gap-2 border-b border-secondary bg-background px-2 lg:shadow-sm flex-row">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary"
          onClick={() => setToggleShowMedia(!toggleShowMedia)}
        >
          <FaArrowLeft />
        </button>
        <h5 className="font-medium">Media, files and links</h5>
      </div>
    </Transition>
  )
}
