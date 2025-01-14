import { fetchChats } from "@/Api/chats";
import { existingFiles, existingLinks, existingMedia } from "@/utils";
import { usePage } from "@inertiajs/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { create } from "zustand";

export const useChatStore = create((set) => ({
    chats: [],
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
    setChats: (value) => set({ chats: value }),
    setPaginate: (value) => set({ paginate: value }),
    refetchChats: async () => {
        const lastSync = localStorage.getItem("last-sync-chats");
        const currentTime = moment();

        if (lastSync && currentTime.diff(moment(parseInt(lastSync))) < 3000) return;
        localStorage.setItem("last-sync-chats", currentTime.valueOf().toString());

        if (route().current("chats.*")) {
            return fetchChats().then((response) => set({ chats: response.data.data.data }));
        }
    }
}))

export const ChatProvider = ({ children }) => {
    const props = usePage().props;
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const { chats, paginate, setChats, setPaginate, refetchChats } = useChatStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setChats(props.chats.data);
        setPaginate(props.chats);

        window.Echo.channel(`user-activity`).listen('.user-activity', (data) => {
            if (Array.isArray(data.user)) {
                refetchChats();
            } else {
                const chatsList = chats.length > 0 ? chats : props.chats?.data;
                const existingChat = chatsList.find((chat) => chat.id === data.user?.id);
                existingChat && refetchChats();
            }
        })

        try {
            window.Echo.channel(`send-message-${props.auth.id}`)
                .listen(".send-message", (data) => {
                    refetchChats();
                });
        } catch (error) {
            console.error(`Error in listening to send-message-${props.auth.id} channel:`, error);
        }

    }, [])

    return <>{children}</>
}