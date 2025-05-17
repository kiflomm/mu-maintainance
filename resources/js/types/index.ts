import { PageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'coordinator' | 'worker' | 'stud_service_director';
    campus_id?: number;
}

export interface SharedData extends PageProps {
    auth: {
        user: User | null;
    };
}

export interface Campus {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
} 