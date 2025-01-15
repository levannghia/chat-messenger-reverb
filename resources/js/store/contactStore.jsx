import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { create } from "zustand";

export const contactStore = create((set) => ({
    contacts: [],
    paginate: {
        data: [],
        current_page: 1,
        per_page: 0,
        last_page: 1,
        from: 0,
        to: 0,
        total: 0,
        first_page_url: "",
        last_page_url: "",
        next_page_url: "",
        prev_page_url: "",
    },
    setContacts: (value) => set({ contacts: value }),
    setPaginate: (value) => set({ paginate: value }),
}))

export const ContactProvider = ({ children }) => {
    const props = usePage().props;
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const { contacts, setContacts, paginate, setPaginate } = contactStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setContacts(props.contacts.data)
        setPaginate(props.contacts)

        try {
            window.Echo.channel(`user-activity`).listen('.user-activity', (data) => {
                console.log(data);
                const listContacts = contacts.length > 0 ? contacts : props.contacts.data;
    
                if (Array.isArray(data.user)) {
                    const users = data.user;
                    setContacts(
                        listContacts.map((contact) => {
                            const user = users.find((user) => user.id === contact.id);
                            if (user) contact.is_online = user.is_online;
    
                            return contact;
                        })
                    )
                } else {
                    const user = data.user;
                    setContacts(
                        listContacts.map((contact) => {
                            if (contact.id === user.id) {
                                contact.is_online = user.is_online;
                            }
    
                            return contact;
                        }),
                    );
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return <>{children}</>
}