import React, { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/use-debounce';
import { BiSearch } from "react-icons/bi";
import { useChatStore } from '@/store/useChatStore';
import { useShallow } from 'zustand/react/shallow';
import { fetchChats } from '@/Api/chats';

export default function ChatListSearch({ search, setSearch }) {
    const { setChats, setPaginate } = useChatStore(useShallow((state) => ({
        setChats: state.setChats,
        setPaginate: state.setPaginate,
    })))

    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const [debounceSearch] = useDebounce(search, 300);

    useEffect(() => {
        setIsFirstLoading(false);
        if (!isFirstLoading) {
            fetchChats(debounceSearch).then((response) => {
                // console.log(response.data);
                setChats(response.data.data.data);
                setPaginate(response.data.data)
            })
            
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
