import { fetchFiles, fetchLinks, fetchMedia, fetchMessage } from "@/Api/chat-messages";
import { existingFiles, existingLinks, existingMedia } from "@/utils";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { create } from "zustand";

const useChatMessageStore = create((set, get) => ({
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
    isTyping: false,
    setIsTyping: (value) => set({ isTyping: value }),
    setUser: (value) => set({ user: value }),
    setMessages: (value) => set({ messages: value }),
    setPaginate: (value) => set({ paginate: value }),
    setSelectedMedia: (value) => set({ selectedMedia: value }),
    clearSelectedMedia: () => set({ selectedMedia: undefined }),
    setMedia: (value) => set({ media: value }),
    setFiles: (value) => set({ files: value }),
    setLinks: (value) => set({ links: value }),
    reloadMedia: () => {
        fetchMedia(get().user).then((response) => set({ media: response.data.data }));
    },
    reloadFiles: () => {
        fetchFiles(get().user).then((response) => set({ files: response.data.data }));
    },
    reloadLinks: () => {
        fetchLinks(get().user).then((response) => set({ links: response.data.data }));
    },
    toggleSidebarRight: () => {
        const currentValue = localStorage.getItem("toggle-sidebar-right") === "true";
        const newValue = !currentValue
        localStorage.setItem("toggle-sidebar-right", String(newValue))
        set({ showSidebarRight: newValue })
    },
    // Helper methods
    refetchMessages: async (user) => {
        const response = await fetchMessage(user)
        set({
            paginate: response.data.data,
            messages: response.data.data.data
        })
    },

    syncAll: async (data, user) => {
        const store = get()
        await store.refetchMessages(user)

        if (existingMedia(data.chat.attachments)) {
            await store.reloadMedia(user)
        }
        if (existingFiles(data.chat.attachments)) {
            await store.reloadFiles(user)
        }
        if (existingLinks(data.chat.links)) {
            await store.reloadLinks(user)
        }
    },
    // Initialize store with props
    initialize: (props) => {
        set({
            user: props.user,
            messages: props.messages.data,
            paginate: props.messages,
            media: props.media,
            files: props.files,
            links: props.links
        })

        // Set up Echo listeners
        window.Echo.channel(`user-activity`).listen(
            ".user-activity",
            (data) => {
                const currentUser = get().user
                if (currentUser.id === data.user.id) {
                    set({
                        user: { ...currentUser, is_online: data.user.is_online }
                    })
                }
            }
        )

        window.Echo.channel(
            `send-message-${props.user.id}-to-${props.auth.id}`
        ).listen(".send-message", (data) => {
            get().syncAll(data, props.user)
        })

        window.Echo.channel(
            `send-group-message-${props.user.id}`
        ).listen(".send-group-message", (data) => {
            get().syncAll(data, props.user)
        })
    }
}))

export default useChatMessageStore

// export const ChatMessageProvider = ({ children }) => {
//     const props = usePage().props;
//     const [isFirstLoading, setIsFirstLoading] = useState(true);
//     const {
//         user,
//         setUser,
//         setMessages,
//         setPaginate,
//         setMedia,
//         setLinks,
//         setFiles,
//         reloadMedia,
//         reloadFiles,
//         reloadLinks
//     } = useChatMessageStore();

//     const refetchMessages = () => {
//         fetchMessage(props.user).then((response) => {
//             setPaginate(response.data.data);
//             setMessages(response.data.data.data);
//         })
//     }

//     const syncAll = (data) => {
//         refetchMessages();
//         console.log("data: ", data);

//         existingMedia(data.chat.attachments) && reloadMedia(props.user);
//         existingFiles(data.chat.attachments) && reloadFiles(props.user);
//         existingLinks(data.chat.links) && reloadLinks(props.user);
//     }

//     useEffect(() => {
//         setIsFirstLoading(false);
//         setUser(props.user);
//         setMessages(props.messages?.data);
//         setPaginate(props.messages);
//         setMedia(props.media);
//         setFiles(props.files);
//         setLinks(props.links);

//         // Check if Laravel Echo is properly configured and working
//         if (window.Echo) {
//             window.Echo.channel(`user-activity`).listen(
//                 ".user-activity",
//                 (data) => {
//                     const tmpUser = user.id ? user : props.user;
//                     tmpUser.id === data.user.id && setUser({ ...user, is_online: data.user.is_online });
//                 },
//             );

//             window.Echo.channel(`send-message-${props.user.id}-to-${props.auth.id}`)
//                 .listen('.send-message', syncAll)
//                 .error((error) => {
//                     console.error('Echo error:', error);
//                 });

//             window.Echo.channel(`send-group-message-${props.user.id}`)
//                 .listen('.send-group-message', syncAll);

//         } else {
//             console.error("Laravel Echo is not properly configured or not working.");
//         }
//     }, []);

//     return <>{children}</>
// }

