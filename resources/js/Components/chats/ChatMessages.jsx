import { useAppStore } from '@/store/appStore'
import { useChatMessageStore } from '@/store/chatMessageStore';
import clsx from 'clsx';
import moment from 'moment';
import React, { Fragment } from 'react'
import DeleteMessage from './DeleteMessage';

export default function ChatMessages() {
    const { auth } = useAppStore();
    const { user } = useChatMessageStore();

    return (
        <div className="relative flex flex-1 flex-col gap-[3px] overflow-x-hidden">
            <Fragment>
                <p className="p-4 text-center text-xs text-secondary-foreground sm:text-sm">
                    {moment().format("DD MMMM YYYY")}
                </p>
                <div className="flex flex-row justify-start">
                    <div className="text-sm text-foreground">
                        <div className="group relative flex items-center gap-2">
                            <div>
                                {/* <div className="mb-1 mt-2 flex items-center gap-2">
                                    <img
                                        src={message.from.avatar}
                                        alt={message.from.name}
                                        className="h-6 w-6 rounded-full border border-secondary"
                                    />
                                    <p className="text-sm font-medium">
                                        {message.from.name}
                                    </p>
                                </div> */}
                                <div className="relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl bg-secondary py-2 pl-2 pr-4 text-sm lg:max-w-md">
                                    <p
                                        dangerouslySetInnerHTML={{ __html: "wqqqqqqqqqqq qưddddđ" }}
                                        className="my-auto overflow-auto"
                                    />
                                    <span className="-mt-4 ml-auto text-xs text-secondary-foreground">
                                        {moment().format("H:mm")}
                                    </span>
                                </div>
                            </div>
                            <DeleteMessage message={""} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-end">
                    <div className="text-sm text-white">
                        <div className="group relative flex flex-row-reverse items-center gap-2">
                            <div
                                className={clsx(
                                    "relative flex max-w-xs flex-wrap items-end gap-2 rounded-2xl py-2 pl-4 pr-2 lg:max-w-md",
                                    !user.message_color && "bg-primary",
                                )}
                                style={{
                                    background: user.message_color
                                        ? user.message_color
                                        : "",
                                }}
                            >
                                <p
                                    dangerouslySetInnerHTML={{ __html: "Ok Bạn" }}
                                    className="my-auto overflow-auto"
                                />
                                <span className="-mt-4 ml-auto text-xs text-white/80">
                                    {moment().format("H:mm")}
                                </span>
                            </div>

                            <DeleteMessage message={""} />
                        </div>
                    </div>
                </div>
            </Fragment>
        </div>
    )
}
