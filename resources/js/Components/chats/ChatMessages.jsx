import { useAppStore } from '@/store/appStore'
import { useChatMessageStore } from '@/store/chatMessageStore';
import clsx from 'clsx';
import moment from 'moment';
import React, { Fragment } from 'react'
import DeleteMessage from './DeleteMessage';
import { formatFileSize, isImageLinkValid } from '@/utils';
import { BsFileEarmark, BsFileEarmarkText } from 'react-icons/bs';

export default function ChatMessages() {
    const { auth } = useAppStore();
    const { user, messages, paginate } = useChatMessageStore();

    const sortedAndFilteredMessages = messages.sort((a, b) => a.sort_id - b.sort_id)
        .filter((message, index) => {
            if (message.chat_type === 'group_chats' && index === 0) {
                return false
            }

            return true;
        })
        .filter((message) => message.body || message.attachments?.length > 0)

    return (
        <div className="relative flex flex-1 flex-col gap-[3px] overflow-x-hidden">
            {sortedAndFilteredMessages.map((message, index) => {
                const isFirstMessage = index === 0;
                const date = moment(message.created_at);
                const prevDate = sortedAndFilteredMessages[index - 1]?.created_at;
                const isDifferentDate = !date.isSame(prevDate, "date");

                const messageWithImages = message.attachments.filter((attachment) => isImageLinkValid(attachment.original_name))
                const messageWithFiles = message.attachments.filter((attachment) => !isImageLinkValid(attachment.original_name))
                // console.log("date", date);
                // console.log("prevDate", prevDate);
                // console.log("isDifferentDate", isDifferentDate);
                return (
                    <Fragment key={`message-${message.id}`}>
                        {(isFirstMessage || isDifferentDate) && (
                            <p className="p-4 text-center text-xs text-secondary-foreground sm:text-sm">
                                {date.format("DD MMMM YYYY")}
                            </p>
                        )}

                        {message.from_id === user.id && message.from_id !== auth.id ? (
                            <div className="flex flex-row justify-start">
                                <div className="text-sm text-foreground">
                                    <div className="group relative flex items-center gap-2">
                                        <div>
                                            <div className="mb-1 mt-2 flex items-center gap-2">
                                                <img
                                                    src={message.from.avatar}
                                                    alt={message.from.name}
                                                    className="h-6 w-6 rounded-full border border-secondary"
                                                />
                                                <p className="text-sm font-medium">
                                                    {message.from.name}
                                                </p>
                                            </div>
                                            <div className="relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl bg-secondary py-2 pl-2 pr-4 text-sm lg:max-w-md">
                                                <p
                                                    dangerouslySetInnerHTML={{ __html: message.body }}
                                                    className="my-auto overflow-auto"
                                                />
                                                <span className="-mt-4 ml-auto text-xs text-secondary-foreground">
                                                    {date.format("H:mm")}
                                                </span>
                                            </div>
                                        </div>
                                        <DeleteMessage message={message} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col justify-end">
                                <div className="text-sm text-white">
                                    <div className={clsx("group relative flex flex-row-reverse items-center gap-2", message.body ? "flex" : 'hidden')}>
                                        <div
                                            className={clsx(
                                                "relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl py-2 pl-4 pr-2 lg:max-w-md",
                                                !user?.message_color && "bg-primary",
                                            )}
                                            style={{
                                                background: user?.message_color
                                                    ? user?.message_color
                                                    : "",
                                            }}
                                        >
                                            <p
                                                dangerouslySetInnerHTML={{ __html: message.body }}
                                                className="my-auto overflow-auto"
                                            />
                                            <span className="-mt-4 ml-auto text-xs text-white/80">
                                                {date.format("H:mm")}
                                            </span>
                                        </div>
                                        <DeleteMessage message={message} />
                                    </div>
                                    {message.attachments && message.attachments.length > 0 && (
                                        <div className='group relative flex justify-end gap-1'>
                                            <div className="order-2 flex max-w-xs flex-col justify-end">
                                                <div 
                                                className={clsx("grid ml-auto", messageWithImages.length > 3 ? 'w-[300px] grid-cols-3' : `w-[${messageWithImages.length * 100}px] grid-cols-${messageWithImages.length}`)}
                                                    dir='rtl'
                                                >
                                                    {messageWithImages.map((attachment) => (
                                                        <div className='group/image flex w-24 h-24 items-center justify-center overflow-hidden rounded-xl p-1 translate-all hover:bg-secondary' key={attachment.file_name}>
                                                            <img src={`${attachment.file_path}/${attachment.file_name}`} alt={attachment.original_name} className='h-full object-cover rounded-lg' />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="ml-auto grid max-w-xs grid-cols-1 gap-1">
                                                    {messageWithFiles.map((attachment) => (
                                                        <div className='group/file' key={attachment.file_name}>
                                                            <div
                                                                className='relative flex w-full cursor-pointer items-center gap-2 rounded-xl bg-secondary/70 p-2 text-foreground transition-all hover:bg-secondary'
                                                                onClick={() => { }}
                                                            >
                                                                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white'>
                                                                    <BsFileEarmarkText className='text-xl' />
                                                                </div>
                                                                <div className='flex-1 overflow-hidden'>
                                                                    <h5 className='font-medium truncate'>{attachment.original_name}</h5>
                                                                    <div className='flex justify-between gap-2 text-xs'>
                                                                        <span>{formatFileSize(attachment.file_size)}</span>
                                                                        <span className='ml-auto text-secondary-foreground'>{moment(message.created_at).format("H:mm")}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                </div>
                            </div>
                        )}
                    </Fragment>
                )
            })}
        </div>
    )
}
