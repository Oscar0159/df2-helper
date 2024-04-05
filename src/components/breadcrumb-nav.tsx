'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import { usePathname, Link } from '@/navigation';

type Props = {
    className?: string;
};

export default function BreadcrumbNav({ className }: Props) {
    const pathname = usePathname();

    const paths = pathname.split('/').filter((path) => path !== '');

    return (
        <Breadcrumb className={className}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {paths.map((path, index) => (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem key={path}>
                            <BreadcrumbLink asChild>
                                <Link href={`/${paths.slice(0, index + 1).join('/')}`}>{path}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
