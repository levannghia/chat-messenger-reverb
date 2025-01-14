import { fetchContacts } from '@/Api/contact';
import { useDebounce } from '@/hooks/use-debounce';
import { contactStore } from '@/store/contactStore';
import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';

export default function ContactListSearch({ search, setSearch }) {
    const { setContacts, setPaginate } = contactStore();
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [debouncedSearch] = useDebounce(search, 300);

    useEffect(() => {
        setIsFirstLoading(false);

        if (!isFirstLoading) {
            fetchContacts(debouncedSearch).then((response) => {
                setContacts(response.data.data.data);
                setPaginate(response.data.data);
            });
        }
    }, [debouncedSearch]);

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="relative flex items-center px-2 py-0">
            <span className="absolute left-5">
                <BiSearch className="text-2xl text-secondary-foreground" />
            </span>
            <input
                type="text"
                placeholder="Search Messenger"
                className="w-full rounded-lg border-secondary bg-background pl-10 focus:border-secondary focus:ring-transparent"
                value={search}
                onChange={handleOnChange}
            />
        </div>
    );
}
