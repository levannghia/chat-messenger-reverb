import Content from '@/Components/chats/Content'
import Sidebar from '@/Components/chats/Sidebar'
import SidebarRight from '@/Components/chats/SidebarRight'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import { ChatMessageProvider } from '@/store/chatMessageStore'
import { ChatProvider } from '@/store/useChatStore'
import React from 'react'

function Show() {
  return (
    <AppLayout title="Chats">
      <ChatProvider>
        <ChatMessageProvider>
          <ModalProvider>
            <SidebarMini />
            <Sidebar />
            <Content />
            <SidebarRight />
          </ModalProvider>
        </ChatMessageProvider>
      </ChatProvider>
    </AppLayout>
  )
}

export default Show