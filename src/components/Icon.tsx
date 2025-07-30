import { cn } from '@/utils';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon = ({ name, size = 22, className, onClick }: IconProps) => (
  <span
    className={cn('material-symbols-outlined text-primary-dark', className)}
    style={{
      fontSize: `${size}px`,
    }}
    onClick={onClick}
  >
    {name}
  </span>
);

export default Icon;
