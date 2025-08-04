import { IconButton, MoreMenu } from '@/components';

interface ToolbarItemType {
  id: string;
  label: string;
  iconName: string;
  onClick?: () => void;
}

const ToolbarItem = ({ label, iconName, onClick }: ToolbarItemType) => (
  <IconButton label={label} iconName={iconName} onClick={onClick} />
);

const Toolbar = () => {
  const toolbarItems = [
    {
      id: 'background-options',
      label: 'Background options',
      iconName: 'palette',
      onClick: () => {},
    },
    {
      id: 'archive',
      label: 'Archive',
      iconName: 'archive',
      onClick: () => {},
    },
    {
      id: 'more',
      label: 'More',
      iconName: 'more_vert',
    },
  ];

  return (
    <div className="flex items-center gap-x-2">
      {toolbarItems.map((item) =>
        item.id === 'more' ? (
          <MoreMenu>
            <ToolbarItem key={item.id} {...item} />
          </MoreMenu>
        ) : (
          <ToolbarItem key={item.id} {...item} />
        ),
      )}
    </div>
  );
};

export default Toolbar;
