import { fetchFiles, fetchLinks, fetchMedia } from "@/Api/chat-messages";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { create } from "zustand";

export const useChatMessageStore = create((set, get) => ({
    user: {
        id: "",
        name: "",
        email: "",
        email_verified_at: "",
        avatar: "",
        active_status: false,
        is_online: false,
        last_seen: "",
        chat_type: 'chats',
        message_color: "",
        is_contact_saved: false,
        is_contact_blocked: false,
        description: "",
        creator_id: "",
        creator: {
            id: "",
            name: "",
        },
        members_count: 0,
    },
    messages: [],
    paginate: {
        data: [],
        current_page: 1,
        per_page: 0,
        last_page: 1,
        from: 0,
        to: 0,
        total: 0,
        first_page_url: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
    },
    showSidebarRight: false,
    media: [],
    links: [],
    files: [],
    selectedMedia: undefined,
    setUser: (value) => set({ user: value }),
    setMessages: (value) => set({ messages: value }),
    setPaginate: (value) => set({ paginate: value }),
    setSelectedMedia: (value) => set({ selectedMedia: value }),
    clearSelectedMedia: () => set({ selectedMedia: undefined }),
    setMedia: (value) => set({ media: value }),
    setFiles: (value) => set({ files: value }),
    setLinks: (value) => set({ links: value }),
    reloadMedia: () => {
        fetchMedia(get().user).then((response) => set({media: response.data.data}));
    },
    reloadFiles: () => {
        fetchFiles(get().user).then((response) => set({files: response.data.data}));
    },
    reloadLinks: () => {
        fetchLinks(get().user).then((response) => set({links: response.data.data}));
    },
    toggleSidebarRight: () => {
        const currentValue = localStorage.getItem("toggle-sidebar-right") === "true";
        localStorage.setItem('toggle-sidebar-right', String(!currentValue));
        set({ showSidebarRight: !currentValue });
    }
}))

export const ChatMessageProvider = ({ children }) => {
    const props = usePage().props;

    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const { setUser, setMessages, setPaginate, setMedia, setLinks, setFiles } = useChatMessageStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setUser(props.user);
        setMessages(props.messages?.data);
        setPaginate(props.messages);
        setMedia(props.media);
        setFiles(props.files);
        setLinks(props.links);
    }, [])

    return <>{children}</>
}

