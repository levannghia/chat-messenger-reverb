import BadgeNotification from '@/Components/chats/BadgeNotification'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'
import { BsArchive, BsChat, BsPeople } from 'react-icons/bs'

function SidebarMini() {
  return (
    <div className='order-2 mt-auto flex flex-row justify-between bg-background sm:order-1 sm:mt-0 sm:flex-col sm:items-center sm:justify-center sm:p-2'>
      <Link 
      href={route('chats.index')}
       className={clsx('relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial', 
        route().current('chats.*') && 'bg-secondary'
       )}
       >
        <BsChat className='w-6 h-6'/>
        <BadgeNotification/>
      </Link>
      <Link
        href={route("contacts.index")}
        className={clsx(
          "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          route().current("contacts.*") && "bg-secondary",
        )}
      >
        <BsPeople className='w-6 h-6'/>
      </Link>
      <Link
        href={route("archived_chats.index")}
        className={clsx(
          "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          route().current("archived_chats.*") && "bg-secondary",
        )}
      >
        <BsArchive className="h-6 w-6" />
      </Link>
    </div>
  )
}

export default SidebarMini