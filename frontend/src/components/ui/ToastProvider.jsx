import { Toaster, toast } from "react-hot-toast";

export const notify = {
  success: (message) =>
    toast.success(message),

  error: (message) =>
    toast.error(message),

  loading: (message) =>
    toast.loading(message),

  dismiss: (toastId) =>
    toast.dismiss(toastId),
};

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 4000,

        style: {
          borderRadius: "12px",
          background: "#ffffff",
          color: "#111827",
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08)",
        },

        success: {
          duration: 3000,
        },

        error: {
          duration: 5000,
        },
      }}
    />
  );
};

export default ToastProvider;