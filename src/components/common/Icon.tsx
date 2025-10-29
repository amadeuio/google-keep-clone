import { cn } from '@/utils';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  light?: boolean;
  filled?: boolean;
  onClick?: () => void;
}

const Icon = ({
  name,
  size = 22,
  className,
  light = false,
  filled = false,
  onClick,
}: IconProps) => (
  <span
    className={cn(
      'material-symbols-outlined text-neutral-400',
      light && 'text-neutral-100',
      className,
    )}
    style={{
      fontSize: `${size}px`,
      fontVariationSettings: filled ? '"FILL" 1' : undefined,
    }}
    onClick={onClick}
  >
    {name}
  </span>
);

export default Icon;
