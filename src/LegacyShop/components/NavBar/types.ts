export type AppBarColor = 'default' | 'primary' | 'secondary' | 'transparent' | 'inherit';

export type NavBarLink = {
  linkText: string,
  linkUrl: string, 
}

export interface NavBarProps {
  links: NavBarLink[];
  color?: AppBarColor;
}
