import React, { useState, useEffect } from 'react';

import { ToastProps } from 'types/index'

import { getToastColor } from 'utils/stringsUtil';

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
