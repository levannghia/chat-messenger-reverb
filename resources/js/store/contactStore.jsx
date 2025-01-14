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

export const ContactProvider = ({ Children }) => {
    const props = usePage().props;
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const { contacts, setContacts, paginate, setPaginate } = contactStore();

    useEffect(() => {
        setIsFirstLoading(false);
        setContacts(props.contacts.data)
        setPaginate(props.contacts)

        window.Echo.channel('user-activity')
            .listen('user-activity', (data) => {
                const listContacts = contacts.length > 0 ? contacts : props.contacts.data;

                if(Array.isArray(listContacts)) {
                    const users = data.user;
                    
                }
            })
    }, [])

    return <>{Children}</>
}