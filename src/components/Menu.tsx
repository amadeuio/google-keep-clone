import { useState, type ReactNode } from 'react';

interface MenuProps {
  children: ReactNode;
  items: MenuItemProps[];
}

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem = ({ label, onClick }: MenuItemProps) => (
  <div
    onClick={onClick}
    className="cursor-pointer px-6 py-2 whitespace-nowrap text-white hover:bg-neutral-700"
  >
    {label}
  </div>
);

const Menu = ({ children, items }: MenuProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsVisible(true)} onBlur={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div className="bg-base absolute top-full left-0 z-10 rounded-sm py-2 shadow-[0.5px_0.5px_6px_rgba(0,0,0,0.6)]">
          {items.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
