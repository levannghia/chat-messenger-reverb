import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { create } from "zustand";

export const useChatMessageStore = create((set) => ({
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
    setUser: (value) => set({user: value}),
    setMessages: (value) => set({messages: value}),
    setPaginate: (value) => set({paginate: value}),
    toggleSidebarRight: () => {
        const currentValue = localStorage.getItem("toggle-sidebar-right") === "true";
        localStorage.setItem('toggle-sidebar-right', String(!currentValue));
        set({showSidebarRight: !currentValue});
    }
}))

export const ChatMessageProvider = ({children}) => {
    const props = usePage().props;
    
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const {setUser, setMessages, setPaginate} = useChatMessageStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setUser(props.user);
        setMessages(props.messages?.data);
        setPaginate(props.messages);
    }, [])

    return <>{children}</>
}

