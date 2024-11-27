export const fetchChats = (query) => {
    return window.axios.get(`${route("chats.users")}?query=${query || ""}`);
}

export const maskAsRead = (chat) => {
    return window.axios.post(route('chats.mark_as_read', chat.id));
}