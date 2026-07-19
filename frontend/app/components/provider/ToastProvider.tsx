import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-black)",
          color: "var(--color-golden)",
          fontFamily: "var(--font-base)",
        },
      }}
    />
  );
};

export default ToastProvider;
