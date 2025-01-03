export const saveMessage = (user, message, attachments = []) => {
    return window.axios.post(
        route('chats.store'),
        {
            to_id: user.id,
            body: message,
            attachments,
        },
        {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
    )
}

export const fetchMessagesInPaginate = (url) => {
    return window.axios.get(url);
}

export const deleteMessage = (message) => {
    return window.axios.delete(route("chats.destroy", message.id));
}

export const deleteFileInChat = (message, attachment) => {
    return window.axios.delete(route('chats.delete_file', [message.id, attachment.file_name]));
}

export const fetchMedia = (user) => {
    return window.axios.get(route("chats.media", user.id));
}

export const fetchFiles = (user) => {
    return window.axios.get(route("chats.files", user.id));
}

export const fetchLinks = (user) => {
    return window.axios.get(route("chats.links", user.id));
}