import ContentEmpty from '@/Components/chats/ContentEmpty'
import Sidebar from '@/Components/chats/Sidebar'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import { ChatProvider } from '@/store/useChatStore'
import React, { useEffect, useRef } from 'react'

function Contacts() {
  return (
    <AppLayout title="Chats">
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

export default Contacts