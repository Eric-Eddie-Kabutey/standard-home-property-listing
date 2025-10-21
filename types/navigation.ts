import { LucideIcon } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    isDropdown: boolean;
    dropdownContent?: DropdownContent;
}

export interface DropdownContent {
    type: 'simple' | 'services';
    items?: SimpleDropdownItem[];
    columns?: ServiceColumn[];
}

export interface SimpleDropdownItem {
    title: string;
    href: string;
    description: string;
    icon: LucideIcon;
}

export interface ServiceColumn {
    title: string;
    href?: string;
    links: ServiceLink[];
}

export interface ServiceLink {
    title: string;
    href: string;
    icon: LucideIcon;
}
