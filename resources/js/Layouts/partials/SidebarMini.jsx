import BadgeNotification from '@/Components/chats/BadgeNotification'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'
import { BsArchive, BsBoxArrowRight, BsChat, BsGear, BsPeople, BsPersonCircle } from 'react-icons/bs'
import Dropdown from "@/components/Dropdown";
import { useAppStore } from '@/store/appStore'
import { useModalContext } from '@/Contexts/modal-context'

function SidebarMini() {
  const { auth } = useAppStore();
  const {openModal} = useModalContext();
  const openPreferences = () => {
    openModal({
      view: 'PREFERENCES',
      size: 'lg'
    })
  }

  return (
    <div className='order-2 mt-auto flex flex-row justify-between bg-background sm:order-1 sm:mt-0 sm:flex-col sm:items-center sm:justify-center sm:p-2'>
      <Link
        href={route('chats.index')}
        className={clsx('relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial',
          route().current('chats.*') && 'bg-secondary'
        )}
      >
        <BsChat className='w-6 h-6' />
        <BadgeNotification />
      </Link>
      <Link
        href={route("contacts.index")}
        className={clsx(
          "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
          route().current("contacts.*") && "bg-secondary",
        )}
      >
        <BsPeople className='w-6 h-6' />
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

      <div className="relative flex flex-1 cursor-pointer items-center justify-center rounded-lg px-3 transition-all hover:bg-secondary sm:mt-auto sm:flex-initial sm:px-0 sm:hover:bg-transparent">
        <Dropdown>
          <Dropdown.Trigger>
            <img
              src={auth.avatar}
              alt=""
              className="h-8 w-8 rounded-full border border-secondary sm:h-10 sm:w-10"
            />
          </Dropdown.Trigger>

          <Dropdown.Content align="top-left" contentClasses="mb-12 sm:mb-10">
            <Dropdown.Button onClick={openPreferences}>
              <div className="flex items-center gap-2">
                <BsGear />
                Preferences
              </div>
            </Dropdown.Button>
            <Dropdown.Link href={route("profile.edit")}>
              <div className="flex items-center gap-2">
                <BsPersonCircle />
                Profile
              </div>
            </Dropdown.Link>
            <Dropdown.Link href={route("logout")} method="post" as="button">
              <div className="flex items-center gap-2">
                <BsBoxArrowRight />
                Log out
              </div>
            </Dropdown.Link>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  )
}

export default SidebarMini