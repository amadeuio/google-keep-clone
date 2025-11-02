import { cn } from '@/utils';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onClick?: () => void;
}

const Input = ({ value, onChange, placeholder, className, onClick }: InputProps) => (
  <input
    type="text"
    placeholder={placeholder}
    className={cn(
      'border-none bg-transparent text-white outline-none focus:shadow-[0_1px_0_0_oklch(55.6%_0_0)]',
      className,
    )}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onClick={onClick}
  />
);

export default Input;
