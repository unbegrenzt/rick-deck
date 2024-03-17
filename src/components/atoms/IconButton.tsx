
interface IconButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      className={`inline-flex items-center justify-center w-10 h-10
               bg-[#BC6C25] hover:bg-[#DDA15E] disabled:opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};

export default IconButton;
