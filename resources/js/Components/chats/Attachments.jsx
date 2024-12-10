import { useChatMessageStore } from '@/store/chatMessageStore'
import { Tab, Transition } from "@headlessui/react";
import clsx from 'clsx';
import React, { Fragment } from 'react'
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
        "absolute top-0 w-full flex-col lg:flex",
        showSidebarRight ? "flex" : "hidden",
      )}
    >
      <div className="sticky top-0 flex h-14 items-center gap-2 border-b border-secondary bg-background px-2 lg:shadow-sm">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary focus:bg-secondary"
          onClick={() => setToggleShowMedia(!toggleShowMedia)}
        >
          <FaArrowLeft />
        </button>
        <h5 className="font-medium">Media, files and links</h5>
      </div>

      <Tab.Group>
        <Tab.List className="mx-2 mb-2 mt-4 flex rounded-full border border-secondary">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary",
                )}
              >
                Media
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary",
                )}
              >
                Files
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={clsx(
                  "w-full rounded-full py-2 text-sm hover:bg-secondary focus:bg-secondary",
                  selected && "bg-secondary",
                )}
              >
                Links
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="h-[calc(100vh_-_120px)]">
          <Tab.Panel className="flex h-full flex-col">

          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Transition>
  )
}
