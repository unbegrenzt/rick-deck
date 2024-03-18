import React from 'react';
// import Toast, { ToastProps } from 'components/atoms/Toast';
import useToastStore from 'src/store/useToastStore';

const ToastContainer: React.FC = () => {

  const toasts = useToastStore((state) => state.toasts);

  return (
    <div>
      {toasts.length > 0 && toasts.map((toast) => (
        <p>just a toast {toast.uuid}</p>
      ))}
    </div>

  );
};

// <div className="fixed flex flex-col items-end top-0 right-0">
//   {toasts.map((toast) => (
//     <Toast key={toast.uuid} {...toast} />
//   ))}
// </div>

export default ToastContainer;
