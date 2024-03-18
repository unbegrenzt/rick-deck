import React, { useState, useEffect } from 'react';

export interface ToastProps {
  uuid: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

function getToastColor(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'bg-green-500';
    case 'error':
      return 'bg-red-500';
    case 'info':
      return 'bg-blue-500';
    case 'warning':
      return 'bg-yellow-500';
    default:
      return 'bg-white-500';
  }
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', duration = 2500 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  const handleClick = () => {
    setVisible(false);
  };

  return (
    <div
      className={`
        flex rounded-lg p-4 m-4 w-fit
        cursor-default
        shadow-lg
        text-[#FEFAE0] ${getToastColor(type)}
        ${visible ? 'block' : 'hidden'}
      `}
      onClick={handleClick}
    >
      <div className={`p-2`}>{message}</div>
    </div>
  );
};

export default Toast;
