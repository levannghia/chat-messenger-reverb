import Alert from '@/Components/Alert';
import { useAppStore } from '@/store/appStore'
import { Head, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'

function AppLayout({ title, children }) {

    const props = usePage().props;
    const [isFirstLoading, setIsFirstLoading] = useState(true);
    const notificationRef = useRef(null);
    const {
        errorMsg,
        successMsg,
        notificationCount,
        setAuth,
        setErrorMsg,
        setSuccessMsg,
        setNotificationCount,
        syncNotification,
    } = useAppStore();

    // Initialize state on component mount
    useEffect(() => {
        setAuth(props.auth);
        //   setNotificationCount(props.notification_count);
        //   setIsFirstLoading(false);

        if (props.error_msg) setErrorMsg(props.error_msg);
        if (props.success_msg) setSuccessMsg(props.success_msg);

        //   window.Echo.channel(`send-message-${props.auth.id}`).listen(".send-message", () => {
        //     syncNotification().then(() => {
        //       notificationRef.current?.play();
        //     });
        //   });
    }, []);

    // Set timeout for error and success messages
    useEffect(() => {
        if (errorMsg) setTimeout(() => setErrorMsg(null), 5000);
        if (successMsg) setTimeout(() => setSuccessMsg(null), 5000);
    }, [errorMsg, successMsg]);

    // Update badge notification count
    // useEffect(() => {
    //   if (!isFirstLoading) replaceBadgeNotificationCount(notificationCount);
    // }, [notificationCount]);

    return (
        <>
            <Head title={title} />
            <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground sm:flex-row">
                {children}
            </div>
            {errorMsg && <Alert message={errorMsg} className="bg-danger text-white" />}
            {successMsg && <Alert message={successMsg} className="bg-success text-white" />}

            <audio controls className="hidden" ref={notificationRef}>
                <source src="/audios/notification.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </>
    )
}

export default AppLayout