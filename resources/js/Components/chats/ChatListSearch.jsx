import React, { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce';
import { BiSearch } from "react-icons/bi";

export default function ChatListSearch({ search, setSearch }) {
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [debounceSearch] = useDebounce(search, 300);

    useEffect(() => {
        setIsFirstLoading(false);
        if (!isFirstLoading) {
            console.log(debounceSearch);
            
        }
    }, [debounceSearch])
    
    const handleOnChange = (e) => {
        setSearch(e.target.value);
    }

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
