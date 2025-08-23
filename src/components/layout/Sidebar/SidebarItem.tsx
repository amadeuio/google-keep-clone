import { Icon } from '@/components';
import { cn } from '@/utils';

const SidebarItem = ({
  title,
  url,
  iconName,
  onClick,
  isActive,
}: {
  title: string;
  url: string;
  iconName: string;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <a
    href={url}
    className={cn(
      'flex items-center gap-x-8 rounded-r-full py-3 pl-6 text-sm font-[500] transition-colors duration-100 ease-in-out',
      isActive ? 'bg-[#41331c]' : 'hover:bg-[#303135]',
    )}
    onClick={onClick}
  >
    <Icon size={24} name={iconName} />
    <span>{title}</span>
  </a>
);

export default SidebarItem;
