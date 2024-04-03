'use client';

import dynamic from 'next/dynamic';
import { MenuIcon } from 'lucide-react';
import { BookIcon, MapIcon, PuzzleIcon, DraftingCompassIcon, WrenchIcon } from 'lucide-react';

import { usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const ModeToggle = dynamic(() => import('@/components/mode-toggle'));
import LocaleSwitcher from '@/components/locale-switcher';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const navItems: { key: string; slug: string; icon?: JSX.Element; }[] = [
    {
        key: 'information',
        slug: '/information',
        icon: <BookIcon size={22} />,
    },
    {
        key: 'map_and_mission',
        slug: '/map-mission',
        icon: <MapIcon size={22} />,
    },
    {
        key: 'puzzle',
        slug: '/puzzle',
        icon: <PuzzleIcon size={22} />,
    },
    {
        key: 'blueprint',
        slug: '/blueprint',
        icon: <DraftingCompassIcon size={22} />,
    },
    {
        key: 'tool',
        slug: '/tool',
        icon: <WrenchIcon size={22} />,
    },
];

export default function Navigation() {
    const pathname = usePathname();

    const t = useTranslations('Navigation');

    return (
        <>
            {/* desktop navigation */}
            <nav
                className="sticky top-0 z-10 hidden h-screen shrink-0 flex-col items-center justify-between gap-4 p-5 pr-6 sm:flex xl:bottom-0 xl:z-auto xl:w-52 xl:flex-col xl:items-start"
                id="desktop-nav"
            >
                <div className="flex w-full flex-col items-center gap-3">
                    <Link
                        href="/"
                        className="hidden h-14 w-full items-center pl-3  text-lg font-medium tracking-wide xl:flex"
                    >
                        {t('title')}
                    </Link>
                    <Link href="/" className="flex h-14  items-center text-lg font-medium tracking-wide xl:hidden">
                        {t('title_short')}
                    </Link>
                    {navItems.map((navItem) => (
                        <Button
                            asChild
                            variant={pathname.includes(navItem.slug) ? 'secondary' : 'ghost'}
                            key={navItem.slug}
                            className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4"
                        >
                            <Link href={navItem.slug}>
                                {navItem.icon && navItem.icon}
                                <span className="hidden xl:ml-3 xl:flex">{t(navItem.key)}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="flex w-full flex-col justify-center gap-3">
                    <LocaleSwitcher />
                    <ModeToggle className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4" />
                </div>
            </nav>

            {/* mobile navigation */}
            <nav
                className="fixed bottom-0 z-[99] flex w-full justify-center gap-4 bg-background p-5 sm:hidden"
                id="mobile-nav"
            >
                <Sheet>
                    <SheetTrigger className="flex flex-col items-center">
                        <MenuIcon size={24} className="shrink-0" />
                        <small>menu</small>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="pb-24">
                        <div className="flex flex-col gap-6">
                            {navItems.map((navItem) => (
                                <Link href={navItem.slug} key={navItem.slug} className="flex items-center gap-2">
                                    {navItem.icon}
                                    <span>{navItem.key}</span>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
