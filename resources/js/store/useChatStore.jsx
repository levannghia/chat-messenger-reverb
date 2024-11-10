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
        last_page_url: "string",
        next_page_url: "string",
        prev_page_url: "string",
    },
    setChats: (value) => set({chats: value}),
    setPaginate: (value) => set({paginate: value}),
    refetchChats: async () => {
        const lastSync = localStorage.getItem("last-sync-chats");
        const currentTime = moment();

        if(lastSync && currentTime.diff(moment(parseInt(lastSync))) < 3000) return;
        localStorage.setItem("last-sync-chats", currentTime.valueOf().toString());

        const currentRoute = route().current();
        if(currentRoute = "chats.*") {
            
        }
    }
}))

export const ChatProvider = ({children}) => {
    const props = usePage().props;
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const { chats, paginate, setChats, setPaginate, refetchChats } = useChatStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setChats(props.chats.data);
        setPaginate(props.chats);
    }, [])

    return <>{children}</>
}