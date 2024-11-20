import { saveMessage } from '@/Api/chat-messages';
import { useAppStore } from '@/store/appStore';
import { useChatMessageStore } from '@/store/chatMessageStore';
import { useChatStore } from '@/store/useChatStore';
import clsx from 'clsx'
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { BiSend } from 'react-icons/bi';
import { BsEmojiAngry, BsEmojiSmile, BsPlusLg } from 'react-icons/bs'

export default function ChatFooter({
  scrollToBottom,
  attachments,
  closeOnPreview,
  onSelectOrPreviewFiles,
}) {
  const { theme, auth } = useAppStore();
  const { refetchChats } = useChatStore();
  const { user, setMessages, messages } = useChatMessageStore();
  const [message, setMessage] = useState("");
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState(48);
  const [isTyping, setIsTyping] = useState(false);
  const [processing, setProcessing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, [])

  const handleOnChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      const { scrollHeight, clientHeight } = textareaRef.current;
      // console.log(scrollHeight, clientHeight);
      if (scrollHeight !== clientHeight) {
        setTextareaHeight(clientHeight + 4);
      }

    }
  }

  const handleOnKeyDown = (e) => {
    const onPressBackspace = e.key === 'Backspace';
    const onPressEnter = e.key === 'Enter';

    if (onPressEnter && !e.shiftKey) {
      e.preventDefault();
      handleOnSubmit(e);
    }

    if (onPressBackspace) {
      const target = e.target;
      const lines = target.value.split("\n");
      console.log(lines);

      if (target.offsetHeight > 48) {
        if (lines[lines.length - 1] === "") {
          setTextareaHeight((prev) => prev - 24);
        }
      }

    }
  }

  const onSelectFile = (e) => {
    onSelectOrPreviewFiles(e.target.files);
  }

  const toggleEmoji = () => {
    setIsOpenEmoji(!isOpenEmoji);
  };

  const handleOnEmojiClick = (emoji) => {
    setMessage((preMsg) => preMsg + emoji)
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    if (message.length === 0 && attachments.length === 0 || processing) return;

    saveMessage(user, message, attachments)
      .then((response) => {
        setMessage("");
        setIsOpenEmoji(false);
        setTextareaHeight(48);
        textareaRef.current.focus();

        const data = response.data.data;
        setMessages([...messages, data]);
        refetchChats();

        setTimeout(scrollToBottom, 300)
      })
      .finally(() => setProcessing(false));
  }

  return (
    <form
      className='flex items-end gap-2 bg-background p-2 text-foreground'
      onSubmit={handleOnSubmit}
    >
      <label htmlFor="file"
        className='mt-1 cursor-pointer rounded-full p-2 text-primary transition-all hover:bg-secondary focus:bg-secondary'
      >
        <BsPlusLg className='h-6 w-6' />
        <input type="file" id="file" className='hidden' multiple onChange={onSelectFile} />
      </label>
      <div className='relative flex flex-1 items-end'>
        <button
          type='button'
          className='absolute right-2 mb-3 text-primary'
          onClick={toggleEmoji}
        >
          <BsEmojiSmile className='h-6 w-6' />
        </button>
        <div
          className={clsx('absolute bottom-14 right-0 z-10', isOpenEmoji ? 'block' : 'hidden')}
        >
          <EmojiPicker
            theme={theme === "system" ? "auto" : theme}
            skinTonesDisabled={true}
            height={400}
            onEmojiClick={({ emoji }) => handleOnEmojiClick(emoji)}
          />
        </div>
        <textarea
          paceholder="Aa"
          className="max-h-[7.5rem] w-full resize-none rounded-xl border border-secondary bg-secondary pr-10 text-foreground focus:border-transparent focus:ring-transparent"
          style={{ height: `${textareaHeight}px`, }}
          value={message}
          ref={textareaRef}
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
        />
      </div>
      <button
        className={clsx(
          "mb-1 flex rounded-full p-2 text-primary transition-all disabled:cursor-not-allowed",
          message.trim().length === 0 &&
          "hover:bg-secondary focus:bg-secondary",
          message.trim().length > 0 && !processing && "bg-primary !text-white",
        )}
        disabled={processing}
        onClick={handleOnSubmit}
      >
        <BiSend className="h-6 w-6" />
      </button>
    </form>
  )
}
