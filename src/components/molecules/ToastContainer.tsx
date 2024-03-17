import React from 'react';
import Toast, { ToastProps } from 'components/atoms/Toast';

const ToastContainer: React.FC<{ toasts: ToastProps[] }> = ({ toasts }) => {
  return (
    <div className="fixed flex flex-col items-end top-0 right-0">
      {toasts.map((toast) => (
        <Toast key={toast.uuid} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
