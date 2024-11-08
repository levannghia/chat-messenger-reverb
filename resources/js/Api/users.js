export const updateUser = (user, data) => {
    return window.axios.patch(route('users.update', user.id), {
        email: user.email,
        name: user.name,
        ...data
    });
}