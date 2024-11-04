import { Head } from '@inertiajs/react'
import React from 'react'

function AppLayout({ title, children }) {
    return (
        <>
            <Head title={title} />
            <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground sm:flex-row">
                {children}
            </div>
        </>
    )
}

export default AppLayout