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