export const fetchChats = (query) => {
    return window.axios.get(`${route("chats.users")}?query=${query || ""}`);
}

export const maskAsRead = (chat) => {
    return window.axios.post(route('chats.mark_as_read', chat.id));
}

export const maskAsUnread = (chat) => {
    return window.axios.post(route('chats.mark_as_unread', chat.id));
}

export const archiveChat = (chat) => {
    return window.axios.post(route("chats.archive", chat.id))
}

export const deleteChat = (chat) => {
    return window.axios.delete(route("chats.destroy_all", chat.id));
}

export const customizeChat = (user, message_color) => {
    return window.axios.post(route('chats.customize_chat', user.id), {
        message_color
    })
}