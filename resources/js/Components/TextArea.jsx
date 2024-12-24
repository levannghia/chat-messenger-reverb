import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
  } from "react";
  
  export default forwardRef(function TextInput(
    {
      type = "text",
      className = "",
      isFocused = false,
      ...props
    },
    ref,
  ) {
    const localRef = useRef(null);
  
    useImperativeHandle(ref, () => ({
      focus: () => localRef.current?.focus(),
    }));
  
    useEffect(() => {
      if (isFocused) {
        localRef.current?.focus();
      }
    }, []);
  
    return (
      <textarea
        {...props}
        className={"form-control " + className}
        ref={localRef}
      />
    );
  });
  