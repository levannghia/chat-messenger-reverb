import { usePage } from "@inertiajs/react";
import { createContext, useContext, useEffect, useReducer, useState } from "react";

const initialState = {
    chats: [],
    paginate: {
        data: [],
        current_page: 1,
        per_page: 0,
        last_page: 1,
        from: 0,
        to: 0,
        total: 0,
        first_page_url: "",
        last_page_url: "string",
        next_page_url: "string",
        prev_page_url: "string",
    },
    setChats: () => { },
    setPaginate: () => { },
    refetchChats: () => { },
}

const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CHATS":
        return {
          ...state,
          chats: action.payload,
        };
  
      case "SET_PAGINATE":
        return {
          ...state,
          paginate: action.payload,
        };
    }
  };
const ChatContext = createContext(initialState);

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
    const props = usePage().props;
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isFirstLoading, setIsFirstLoading] = useState(true);

    const setChats = (value) => dispatch({ type: "SET_CHATS", payload: value });
    const setPaginate = (value) => dispatch({ type: "SET_PAGINATE", payload: value });
    
    useEffect(() => {
        setIsFirstLoading(false);
        setChats(props.chats.data);
        setPaginate(props.chats);
    }, []);

    const value = {
        ...state,
        chats: isFirstLoading ? props.chats.data : state.chats,
        paginate: isFirstLoading ? props.chats : state.paginate,
        setChats,
        setPaginate,
    }
    
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

