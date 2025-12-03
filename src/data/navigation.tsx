import {
    IoPersonOutline,
    IoBriefcaseOutline,
    IoDocumentTextOutline,
    IoLayersOutline,
    IoStarOutline,
    IoMailOutline
} from 'react-icons/io5';
import type { NavItem } from '../types';

export const navItems: NavItem[] = [
    { name: 'About', path: '/', icon: <IoPersonOutline size={20} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <IoBriefcaseOutline size={20} /> },
    { name: 'Blog', path: '/blog', icon: <IoDocumentTextOutline size={20} /> },
    { name: 'Platforms', path: '/platforms', icon: <IoLayersOutline size={20} /> },
    { name: 'Experience', path: '/experience', icon: <IoStarOutline size={20} /> },
    { name: 'Resume', path: '/resume', icon: <IoDocumentTextOutline size={20} /> },
    { name: 'Contact', path: '/contact', icon: <IoMailOutline size={20} /> },
];
