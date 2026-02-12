
export interface MenuItemType {
  title: string;
  icon: JSX.Element;
  path: string;
  component?: React.FC;
  children?: MenuItemType[];
}