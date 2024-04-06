'use client';

// TODO: make the code more clean and readable

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import {
    BookIcon,
    MapIcon,
    PuzzleIcon,
    DraftingCompassIcon,
    WrenchIcon,
    LinkIcon,
    BadgeAlertIcon,
    GithubIcon,
    ArrowRightFromLineIcon,
    ArrowLeftFromLineIcon,
    XIcon,
} from 'lucide-react';

import { usePathname } from '@/navigation';
import { Button } from '@/components/ui/button';
const ModeToggle = dynamic(() => import('@/components/mode-toggle'));
import LocaleSwitcher from '@/components/locale-switcher';
import { Link } from '@/navigation';
import { cn } from '@/lib/utils';

export default function Navigation() {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const pathname = usePathname();

    const t = useTranslations('Navigation');

    const navItems: { name: string; slug: string; icon?: JSX.Element }[] = [
        {
            name: t('information'),
            slug: '/information',
            icon: <BookIcon size={22} />,
        },
        {
            name: t('map-mission'),
            slug: '/map-mission',
            icon: <MapIcon size={22} />,
        },
        {
            name: t('puzzle'),
            slug: '/puzzle',
            icon: <PuzzleIcon size={22} />,
        },
        {
            name: t('blueprint'),
            slug: '/blueprint',
            icon: <DraftingCompassIcon size={22} />,
        },
        {
            name: t('tool'),
            slug: '/tool',
            icon: <WrenchIcon size={22} />,
        },
        {
            name: t('resource-link'),
            slug: '/resource-link',
            icon: <LinkIcon size={22} />,
        },
    ];

    return (
        <>
            {/* desktop navigation */}
            <nav
                className="sticky top-0 z-10 hidden h-screen shrink-0 flex-col items-center justify-between gap-4 overflow-y-auto p-5 pr-6 sm:flex xl:bottom-0 xl:z-auto xl:w-52 xl:flex-col xl:items-start"
                id="desktop-nav"
            >
                <div className="flex w-full flex-col items-center gap-3">
                    <Link
                        href="/"
                        className="hidden h-14 w-full items-center pl-3 text-lg font-medium tracking-wide xl:flex"
                    >
                        {t('title')}
                    </Link>
                    <Link href="/" className="flex h-14 items-center text-lg font-medium tracking-wide xl:hidden">
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
                                <span className="hidden xl:ml-3 xl:flex">{navItem.name}</span>
                            </Link>
                        </Button>
                    ))}
                    <Button
                        asChild
                        variant="ghost"
                        className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4"
                    >
                        <a
                            href="https://github.com/Oscar0159/df2-helper/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <BadgeAlertIcon size={22} />
                            <span className="hidden xl:ml-3 xl:flex">{t('issue')}</span>
                        </a>
                    </Button>
                    <Button
                        asChild
                        variant="ghost"
                        className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4"
                    >
                        <a href="https://github.com/Oscar0159/df2-helper" target="_blank" rel="noopener noreferrer">
                            <GithubIcon size={22} />
                            <span className="hidden xl:ml-3 xl:flex">{t('github')}</span>
                        </a>
                    </Button>
                </div>
                <div className="flex w-full flex-col justify-center gap-3">
                    <LocaleSwitcher />
                    <ModeToggle className="aspect-square w-10 rounded-full p-2 font-semibold xl:w-full xl:justify-start xl:px-4" />
                </div>
            </nav>

            {/* mobile navigation */}
            <nav className="sm:hidden">
                <div
                    className={cn('fixed inset-0 z-10 bg-background/70', !isSheetOpen && 'hidden')}
                    id="mobile-nav-overlay"
                    onClick={() => setIsSheetOpen(false)}
                ></div>
                <div className="fixed bottom-0 z-20 flex w-full flex-col justify-end">
                    <div
                        className={cn(
                            ' w-full flex-col gap-7 bg-gradient-to-b from-background/70 via-background via-75% to-background/70 px-6 py-3 transition-opacity duration-300 ease-in-out',
                            isSheetOpen ? 'flex opacity-100' : 'fixed translate-x-full opacity-50'
                        )}
                    >
                        <Link href="/" className="text-lg font-medium" onClick={() => setIsSheetOpen(false)}>
                            <span>{t('title')}</span>
                        </Link>
                        {navItems.map((navItem) => (
                            <Link
                                href={navItem.slug}
                                key={navItem.slug}
                                className="flex items-center gap-2"
                                onClick={() => setIsSheetOpen(false)}
                            >
                                {navItem.icon}
                                <span>{navItem.name}</span>
                            </Link>
                        ))}
                        <a
                            href="https://github.com/Oscar0159/df2-helper/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <BadgeAlertIcon size={22} />
                            <span>{t('issue')}</span>
                        </a>
                        <a
                            href="https://github.com/Oscar0159/df2-helper"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                        >
                            <GithubIcon size={22} />
                            <span>{t('github')}</span>
                        </a>
                    </div>
                    <div
                        className="flex w-full justify-between gap-4 bg-gradient-to-t from-background from-50% to-background/70 px-10 py-3"
                        id="mobile-nav"
                    >
                        <div className="flex flex-col items-center" onClick={() => setIsSheetOpen((prev) => !prev)}>
                            <Button
                                variant="ghost"
                                className="pointer-events-none aspect-square w-10 rounded-full p-2 font-semibold"
                            >
                                <XIcon className={cn('shrink-0', !isSheetOpen ? 'hidden' : 'block')} />
                                <MenuIcon className={cn('shrink-0', isSheetOpen ? 'hidden' : 'block')} />
                            </Button>
                            <small>{t('menu')}</small>
                        </div>

                        <div className="flex flex-col items-center">
                            <LocaleSwitcher />
                            <small>{t('locale')}</small>
                        </div>

                        <div className="flex flex-col items-center">
                            <ModeToggle className="aspect-square w-10 rounded-full p-2" />
                            <small>{t('theme')}</small>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
