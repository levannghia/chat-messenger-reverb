export const blockContact = (userId) => {
    return window.axios.post(route("contacts.block", userId));
}

export const unblockContact = (userId) => {
    return window.axios.post(route("contacts.unblock", userId));
}

export const saveContact = (userId) => {
    return window.axios.post(route("contacts.save", userId));
}

export const fetchContactsInPaginate = (url) => {
    return window.axios.get(url);
}

export const fetchContacts = () => {
    return window.axios.get(`${route("contacts.data")}?query=${query || ""}`);
}