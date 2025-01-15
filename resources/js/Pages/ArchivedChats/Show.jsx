import { ChatProvider } from "@/store/useChatStore";
import { ChatMessageProvider } from "@/store/chatMessageStore";
import { ModalProvider } from "@/contexts/modal-context";

import AppLayout from "@/layouts/AppLayout";
import SidebarMini from "@/layouts/partials/SidebarMini";
import Sidebar from "@/components/archivedChats/Sidebar";
import Content from "@/components/chats/Content";
import SidebarRight from "@/components/chats/SidebarRight";
import PopupGallery from "@/components/chats/PopupGallery";

export default function Chats() {
  return (
    <AppLayout title="Archived Chats">
      <ChatProvider>
        <ChatMessageProvider>
          <ModalProvider>
            <SidebarMini />
            <Sidebar />
            <Content />
            <SidebarRight />
            <PopupGallery />
          </ModalProvider>
        </ChatMessageProvider>
      </ChatProvider>
    </AppLayout>
  );
}
