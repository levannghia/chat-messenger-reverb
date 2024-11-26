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

export const deleteMessage = (message) => {
    return window.axios.delete(route("chats.destroy", message.id));
}

export const deleteFileInChat = (message, attachment) => {
    return window.axios.delete(route('chats.delete_file', [message.id, attachment.file_name]));
}