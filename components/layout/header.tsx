import Image from 'next/image';
import Link from 'next/link';

import LanguageSwitcher from '@/components/shared/language-switcher';
import ThemeToggle from '@/components/shared/theme-toggle';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function Header() {
  const informations = [
    {
      title: 'Basic Information',
      description: 'Basic information about the game',
      href: '/information/basic',
    },
    {
      title: 'Membership',
      description: 'Information about the membership',
      href: '/information/membership',
    },
    {
      title: 'Event Gears',
      description: 'Information about the event gears',
      href: '/information/event-gears',
    },
    {
      title: 'Blueprints',
      description: 'Information about the blueprints',
      href: '/information/blueprints',
    },
    {
      title: 'Scrap Value',
      description: 'Information about the scrap value',
      href: '/information/scrap-value',
    },
    {
      title: 'Skills',
      description: 'Information about the skills',
      href: '/information/skills',
    },
  ];

  return (
    <header className="fixed top-0 z-40 flex h-18 w-full items-center justify-between px-[5%] lg:px-[15%]">
      <Link className="text-2xl font-bold" href="/">
        DF2 Helper
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-10">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Information</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[600px] grid-cols-2 gap-3 p-2">
                {informations.map((info) => (
                  <li key={info.title}>
                    <NavigationMenuLink asChild>
                      <Link href={info.href}>
                        <h2 className="text-sm leading-none font-medium">
                          {info.title}
                        </h2>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {info.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Battle</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] grid-cols-[.75fr_1fr] gap-3 p-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/battle/quest-map"
                      className="relative flex h-full justify-end overflow-hidden p-6 opacity-80 transition-opacity duration-300 hover:opacity-90"
                    >
                      <Image
                        src="https://df2profiler.com/gamemap/map_background.png"
                        fill
                        alt="map"
                        sizes="1089px"
                        style={{
                          objectFit: 'cover',
                        }}
                        priority
                      />
                      <h2 className="z-1 text-lg leading-none font-medium text-background dark:text-foreground">
                        Quest Map
                      </h2>
                      <p className="z-1 line-clamp-2 text-sm leading-snug text-secondary dark:text-muted-foreground">
                        Redesign of DF2Profiler
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/battle/chest-puzzles">
                      <h2 className="text-sm leading-none font-medium">
                        Chest Puzzles
                      </h2>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        About the website
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/battle/damage-calculator">
                      <h2 className="text-sm leading-none font-medium">
                        Damage Calculator
                      </h2>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        About the website
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/battle/unique-chest-simulator">
                      <h2 className="text-sm leading-none font-medium">
                        Unique Chest Simulator
                      </h2>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        About the website
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Others</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[600px] grid-cols-2 gap-3 p-2">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/others/helper-tools">
                      <h2 className="text-sm leading-none font-medium">
                        Helper Tools
                      </h2>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        About the website
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/others/resource-links">
                      <h2 className="text-sm leading-none font-medium">
                        Resource Links
                      </h2>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        About the website
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-6 px-4 py-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
