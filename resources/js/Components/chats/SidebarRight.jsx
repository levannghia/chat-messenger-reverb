import clsx from 'clsx';
import React, { useState } from 'react'

export default function SidebarRight() {
    const [showSidebarRight, setShowSidebarRight] = useState(false);
    return (
        <div
            className={clsx(
                "relative order-4 h-full overflow-x-hidden border-secondary sm:flex-1 sm:border-l lg:w-[320px] lg:flex-initial xl:w-[360px]",
                showSidebarRight ? "flex" : "hidden",
            )}
        >

        </div>
    )
}
