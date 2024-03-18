export interface ToastProps {
  uuid: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
