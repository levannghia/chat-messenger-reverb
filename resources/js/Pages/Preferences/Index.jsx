import ContentEmpty from '@/Components/chats/ContentEmpty'
import Content from '@/Components/preferences/Content'
import AppLayout from '@/Layouts/AppLayout'
import SidebarMini from '@/Layouts/partials/SidebarMini'
import React from 'react'

export default function Index() {
  return (
    <AppLayout title="Preferences">
      <SidebarMini/>
      <Content/>
      <ContentEmpty/>
    </AppLayout>
  )
}
