import { IconButton } from '@/components';

const Label = () => (
  <div className="flex flex-col gap-1 text-left">
    <span>Not the real Google Keep! 😜</span>
    <span className="text-neutral-400">clone by amadeu.io</span>
  </div>
);

const User = () => (
  <a href="https://github.com/amadeuio" target="_blank" rel="noopener noreferrer">
    <IconButton iconName="person" label={<Label />} size={24} />
  </a>
);

export default User;
