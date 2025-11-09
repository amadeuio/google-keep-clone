import { Icon } from '@/components';
import { cn } from '@/utils';

const SidebarItem = ({
  title,
  url,
  iconName,
  onClick,
  isActive,
  isCollapsed,
}: {
  title: string;
  url: string;
  iconName: string;
  onClick?: () => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}) => (
  <a
    href={url}
    className={cn(
      'transition-width flex items-center gap-x-8 overflow-hidden rounded-full py-3 text-sm font-[500] duration-100 ease-in-out',
      isActive ? 'bg-[#41331c]' : 'hover:bg-white/6',
      isCollapsed
        ? 'mx-2.75 w-12 pl-3.25 group-hover:mx-0 group-hover:w-70 group-hover:rounded-l-none group-hover:pl-6'
        : 'w-70 rounded-l-none pl-6',
    )}
    onClick={onClick}
  >
    <Icon size={24} name={iconName} className={cn(isActive && 'text-neutral-100')} />
    <span className="whitespace-nowrap">{title}</span>
  </a>
);

export default SidebarItem;
