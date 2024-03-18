import React from 'react';
import Toast from 'components/atoms/Toast';
import useToastStore from 'store/useToastStore';

const ToastContainer: React.FC = () => {

  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed flex flex-col items-end top-0 right-0">
      {toasts.map((toast) => (
        <Toast key={toast.uuid} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
