import { useClickOutside } from '@/hooks';
import { useState, type ReactNode } from 'react';

interface MenuTriggerProps {
  children: ReactNode;
  menu: ReactNode;
  onClickOutside?: () => void;
}

const MenuTrigger = ({ children, menu, onClickOutside }: MenuTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = () => {
    setIsOpen(false);
    onClickOutside?.();
  };
  const { triggerRef } = useClickOutside({ onClickOutside: handleClickOutside });

  return (
    <div className="relative" ref={triggerRef}>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      {isOpen && <div className="absolute top-full left-0 z-10">{menu}</div>}
    </div>
  );
};

export default MenuTrigger;
