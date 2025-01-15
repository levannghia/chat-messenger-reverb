import Sidebar from '@/Components/archivedChats/Sidebar'
import ContentEmpty from '@/Components/chats/ContentEmpty'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import { ChatProvider } from '@/store/useChatStore'
import React from 'react'

function Chats() {
  return (
    <AppLayout title="Archived Chats">
      <ChatProvider>
        <ModalProvider>
          <SidebarMini />
          <Sidebar />
          <ContentEmpty />
        </ModalProvider>
      </ChatProvider>
    </AppLayout>
  )
}

export default Chats