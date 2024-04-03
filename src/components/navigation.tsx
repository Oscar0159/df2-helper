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

type NavItemProps = {
    name: string;
    slug: string;
    description: string;
};

const navItems: { name: string; slug: string; icon?: JSX.Element; items: NavItemProps[] }[] = [
    {
        name: 'Information',
        slug: '/information',
        icon: <BookIcon size={20} />,
        items: [
            {
                name: 'Basic Information',
                slug: '/information/basic-information',
                description: 'Home page',
            },
            {
                name: 'Resource Links',
                slug: '/information/resource-links',
                description: 'Some useful links',
            },
        ],
    },
    {
        name: 'Map & Mission',
        slug: '/map-mission',
        icon: <MapIcon size={20} />,
        items: [
            {
                name: 'DF2 Profiler (Map Drawer)',
                slug: '/map-mission/df2-profiler',
                description: 'Home page',
            },
            {
                name: 'Side Missions',
                slug: '/map-mission/side-missions',
                description: 'About page',
            },
        ],
    },
    {
        name: 'Puzzle',
        slug: '/puzzle',
        icon: <PuzzleIcon size={20} />,
        items: [
            {
                name: 'Letters | Digital | Morse',
                slug: '/puzzle/letters',
                description: 'About page',
            },
            {
                name: 'Light Out',
                slug: '/puzzle/light-out',
                description: 'Home page',
            },
            {
                name: 'Geometric Figures',
                slug: '/puzzle/geometric-figures',
                description: 'Contact page',
            },
        ],
    },
    {
        name: 'Blueprint',
        slug: '/blueprint',
        icon: <DraftingCompassIcon size={20} />,
        items: [
            {
                name: 'Stairway to Hell',
                slug: '/blueprint/stairway-to-hell',
                description: 'Home page',
            },
            {
                name: "Ronin's Blade",
                slug: '/blueprint/ronins-blade',
                description: 'About page',
            },
            {
                name: 'Gore Trimmer',
                slug: '/blueprint/gore-trimmer',
                description: 'Contact page',
            },
            {
                name: 'Vicious Hoarder Backpack',
                slug: '/blueprint/vicious-hoarder-backpack',
                description: 'Contact page',
            },
            {
                name: 'Call Of The Accursed',
                slug: '/blueprint/call-of-the-accursed',
                description: 'Contact page',
            },
            {
                name: 'All Blueprint List',
                slug: '/blueprint/all-blueprint-list',
                description: 'Contact page',
            },
        ],
    },
    {
        name: 'Tool',
        slug: '/tool',
        icon: <WrenchIcon size={22} />,
        items: [
            {
                name: 'Crosshair',
                slug: '/tool/crosshair',
                description: 'Home page',
            },
        ],
    },
];

export default function Navigation() {
    const pathname = usePathname();

    const t = useTranslations('Navigation');

    return (
        <>
            {/* desktop navigation */}
            <nav
                className="sticky top-0 z-10 hidden h-screen shrink-0 flex-col items-center justify-between gap-4 border-b border-secondary p-5 pr-6 shadow-sm sm:flex xl:bottom-0 xl:z-auto xl:w-56 xl:flex-col xl:items-start xl:border-b-0 xl:border-r"
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
                            variant={pathname === navItem.slug ? 'secondary' : 'ghost'}
                            key={navItem.slug}
                            className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4"
                        >
                            <Link href={navItem.slug}>
                                {navItem.icon && navItem.icon}
                                <span className="hidden xl:ml-3 xl:flex">{navItem.name}</span>
                            </Link>
                        </Button>
                    ))}
                </div>
                <div className="flex w-full justify-center">
                    {/* <LocaleSwitcher /> */}
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
                                    <span>{navItem.name}</span>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
