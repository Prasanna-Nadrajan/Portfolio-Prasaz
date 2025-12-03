import { ReactNode } from 'react';

export interface Project {
    title: string;
    category: string;
    image: string;
    link: string;
    description: string;
    techStack: string[];
}

export interface ExperienceItem {
    date: string;
    title: string;
    subtitle: string;
    description: string;
    logo: string;
    link: string;
    side: 'left' | 'right';
}

export interface NavItem {
    name: string;
    path: string;
    icon: ReactNode;
}

export interface BlogPost {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    categories: string[];
}
