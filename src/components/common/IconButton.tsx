import { Icon } from '@/components';
import { cn } from '@/utils';
import { useState } from 'react';

interface IconButtonProps {
  iconName: string;
  label: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const IconButton = ({ iconName, label, size = 16, className, onClick }: IconButtonProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <button
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-full p-3 hover:bg-[#303135]',
        className,
      )}
      onClick={onClick}
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      <Icon size={size} name={iconName} />
      {isTooltipVisible && (
        <div className="absolute top-full left-1/2 z-10 -translate-x-1/2 transform rounded bg-neutral-700 px-2 py-1 text-sm whitespace-nowrap text-white shadow-lg">
          {label}
        </div>
      )}
    </button>
  );
};

export default IconButton;
