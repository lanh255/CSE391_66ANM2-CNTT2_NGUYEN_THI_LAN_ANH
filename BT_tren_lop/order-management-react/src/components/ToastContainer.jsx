function ToastContainer({ toast }) {
  if (!toast.message) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.message}
    </div>
  );
}

export default ToastContainer;