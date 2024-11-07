import ContentEmpty from '@/Components/chats/ContentEmpty'
import Sidebar from '@/Components/chats/Sidebar'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import React from 'react'

function Chats() {
  return (
    <AppLayout title="Chats">
      <ModalProvider>
        <SidebarMini />
        <Sidebar />
        <ContentEmpty />
      </ModalProvider>
    </AppLayout>
  )
}

export default Chats