export const blockContact = (userId) => {
    return window.axios.post(route("contacts.block", userId));
}

export const unblockContact = (userId) => {
    return window.axios.post(route("contacts.unblock", userId));
}

export const saveContact = (userId) => {
    return window.axios.post(route("contacts.save", userId));
}