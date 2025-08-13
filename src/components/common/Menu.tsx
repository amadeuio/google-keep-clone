import { cn } from '@/utils';

export interface MenuItemType {
  label: string;
  action: () => void;
}

const MenuItem = ({ label, action }: MenuItemType) => (
  <div
    onClick={action}
    className="cursor-pointer px-6 py-2 whitespace-nowrap text-white hover:bg-neutral-700"
  >
    {label}
  </div>
);

interface MenuProps {
  items: MenuItemType[];
  className?: string;
}

const Menu = ({ items, className }: MenuProps) => (
  <div
    className={cn(
      'bg-base w-42 rounded-sm py-2 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]',
      className,
    )}
  >
    {items.map((item) => (
      <MenuItem key={item.label} {...item} />
    ))}
  </div>
);

export default Menu;
