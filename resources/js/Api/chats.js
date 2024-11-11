export const fetchChats = (query) => {
    return window.axios.get(`${route("chats.users")}?query=${query || ""}`);
}