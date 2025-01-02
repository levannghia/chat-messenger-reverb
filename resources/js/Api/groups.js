export const fetchMembers = (user) => {
    return window.axios.get(route("group.members", user.id));
}

export const editGroup = (chat) => {
    return window.axios.delete("group.exit", chat.id)
}