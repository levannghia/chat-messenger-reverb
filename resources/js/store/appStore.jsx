import Alert from "@/Components/Alert";
import { useState } from "react";
import { create } from "zustand"

export const useAppStore = create((set) => ({
    auth: {
        id: "",
        name: "",
        email: "",
        email_verified_at: "",
        avatar: "",
        active_status: false,
        is_online: false,
        last_seen: "",
        is_contact_blocked: false,
        is_contact_saved: false,
    },
    errorMsg: null,
    successMsg: null,
    notificationCount: 0,
    setAuth: (value) => set({auth: value}),
    setErrorMsg: (value) => set({errorMsg: value}),
    setNotificationCount: (value) => set({notificationCount: value}),
    syncNotification: () => set({}),
}))

// Component to provide state and handle side effects
export const AppProvider = ({ children }) => {
  const props = usePage().props;
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const notificationRef = useRef(null);
  const {
    theme,
    auth,
    errorMsg,
    successMsg,
    notificationCount,
    setTheme,
    setAuth,
    setErrorMsg,
    setSuccessMsg,
    setNotificationCount,
    syncNotification,
  } = useAppStore();

  // Initialize state on component mount
  useEffect(() => {
    setAuth(props.auth);
    setNotificationCount(props.notification_count);
    setIsFirstLoading(false);

    if (props.error_msg) setErrorMsg(props.error_msg);
    if (props.success_msg) setSuccessMsg(props.success_msg);

    // window.Echo.channel(`send-message-${props.auth.id}`).listen(".send-message", () => {
    //   syncNotification().then(() => {
    //     notificationRef.current?.play();
    //   });
    // });
  }, []);

  // Set timeout for error and success messages
  useEffect(() => {
    if (errorMsg) setTimeout(() => setErrorMsg(null), 5000);
    if (successMsg) setTimeout(() => setSuccessMsg(null), 5000);
  }, [errorMsg, successMsg]);

  // Update badge notification count
  useEffect(() => {
    if (!isFirstLoading) replaceBadgeNotificationCount(notificationCount);
  }, [notificationCount]);

  return (
    <>
      {children}
      {errorMsg && <Alert message={errorMsg} className="bg-danger text-white" />}
      {successMsg && <Alert message={successMsg} className="bg-success text-white" />}

      <audio controls className="hidden" ref={notificationRef}>
        <source src="/audios/notification.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};