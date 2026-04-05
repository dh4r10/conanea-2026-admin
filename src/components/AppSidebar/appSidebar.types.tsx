export type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};
