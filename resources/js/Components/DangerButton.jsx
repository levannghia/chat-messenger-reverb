export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`btn btn-danger ${disabled && "opacity-25"} ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
