export const fetchMembers = (user) => {
    return window.axios.get(route("group.members", user.id));
}

export const exitGroup = (chat) => {
    return window.axios.delete(route("group.exit", chat.id))
}