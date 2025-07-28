import { MdMenu, MdSearch, MdSettings } from 'react-icons/md';

const Search = () => (
  <div className="flex items-center gap-x-2">
    <MdSearch className="h-5 w-5" />
    <input type="text" placeholder="Search" className="bg-transparent" />
  </div>
);

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-x-2">
        <MdMenu className="h-5 w-5" />
        <div className="text-xl font-semibold">Keep</div>
        <Search />
      </div>
      <div className="flex items-center gap-x-2">
        <MdSettings className="h-5 w-5" />
      </div>
    </nav>
  );
};

export default Navbar;
