import logo from '@/assets/logo.png';
import { IconButton } from '@/components';
import { useStore } from '@/store';
import { selectActions } from '@/store/selectors';
import Search from './Search';
import User from './User';

const Navbar = () => {
  const { ui } = useStore(selectActions);

  return (
    <nav className="flex h-16 justify-between border-b px-3 py-2">
      <div className="flex flex-1 items-center">
        <IconButton
          iconName="menu"
          iconClassName="text-color-primary"
          label="Main menu"
          size={24}
          onClick={() => ui.toggleSidebar()}
        />
        <div className="mr-22 ml-2 flex items-center gap-x-2">
          <img src={logo} alt="Keep logo" className="size-10" />
          <div className="text-[20px]">Keep</div>
        </div>
        <Search />
      </div>
      <div className="flex items-center gap-x-2">
        <IconButton iconName="settings" label="Settings" size={24} />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
