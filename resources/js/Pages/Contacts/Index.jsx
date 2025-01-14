import ContentEmpty from '@/Components/chats/ContentEmpty'
import Sidebar from '@/Components/contacts/Sidebar'
import { ModalProvider } from '@/Contexts/modal-context'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import { ContactProvider } from '@/store/contactStore'
import React from 'react'

function Contacts() {
  return (
    <AppLayout title="People">
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