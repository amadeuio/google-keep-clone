import { useActions, useSearch } from '@/store';
import { cn } from '@/utils';
import { useState } from 'react';
import SeachIconButton from './SearchIconButton';

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const search = useSearch();
  const { filters } = useActions();

  return (
    <form
      method="get"
      role="search"
      className={cn(
        'input group flex h-full w-full max-w-[720px] items-center gap-x-2 rounded-lg px-2',
        'bg-[#f1f3f43d]',
        isFocused && 'bg-neutral-100',
      )}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SeachIconButton iconName="search" label="Search" dark={isFocused} />
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-transparent outline-none placeholder:text-neutral-200 focus:text-base focus:placeholder:text-neutral-500"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={search}
        onChange={(e) => filters.set({ search: e.target.value })}
      />
      <SeachIconButton
        iconName="close"
        label="Clear search"
        dark={isFocused}
        onClick={() => filters.set({ search: '' })}
        className={cn(isFocused ? 'opacity-100' : 'cursor-default opacity-0')}
      />
    </form>
  );
};

export default Search;
