import ContentEmpty from '@/Components/chats/ContentEmpty'
import Sidebar from '@/Components/chats/Sidebar'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import React from 'react'

function Chats() {
  return (
    <AppLayout title="Chats">
        <SidebarMini/>
        <Sidebar/>
        <ContentEmpty/>
    </AppLayout>
  )
}

export default Chats