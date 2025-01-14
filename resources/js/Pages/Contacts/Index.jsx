import ContentEmpty from '@/Components/chats/ContentEmpty'
import Sidebar from '@/Components/chats/Sidebar'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import { ContactProvider } from '@/store/contactStore'
import React, { useEffect, useRef } from 'react'

function Contacts() {
  return (
    <AppLayout title="Chats">
      <ContactProvider>
        <ModalProvider>
          <SidebarMini />
          <Sidebar />
          <ContentEmpty />
        </ModalProvider>
      </ContactProvider>
    </AppLayout>
  )
}

export default Contacts