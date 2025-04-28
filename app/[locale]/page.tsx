import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Button } from '@/components/ui/button';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { cn } from '@/lib/utils';
import Github from '@/public/svg/github-mark.svg';

export default async function Page() {
  return (
    <main>
      <div className="absolute inset-0 overflow-hidden">
        {/* Basic Information Link */}
        <div className="absolute top-[15%] -left-[15%] md:top-[13%] md:left-[20%] xl:top-[20%]">
          <CardContainer>
            <CardBody>
              <CardItem
                translateZ={15}
                as="div"
                className="h-48 w-72 rounded-lg bg-muted opacity-70 shadow-lg transition-opacity duration-300 hover:opacity-90 xl:w-80"
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
                  <h2 className="text-lg font-bold">Newbie Player</h2>
                  <p className="text-sm text-muted-foreground">Read the basic information about the game</p>
                  <Button variant="outline" className="mt-6">
                    <Link href="/information/basic">
                      <ArrowRight className="" />
                    </Link>
                  </Button>
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Quest Map Link */}
        <div className="absolute bottom-[15%] -left-[10%] md:bottom-[10%] md:left-[10%] xl:bottom-[15%] xl:left-[13%]">
          <CardContainer>
            <CardBody>
              <CardItem
                translateZ={15}
                as="div"
                className={cn(
                  'h-48 w-48 overflow-hidden rounded-lg bg-muted bg-center opacity-70 shadow-lg transition-opacity duration-300 hover:opacity-90',
                )}
              >
                <Link
                  href="/battle/quest-map"
                  className="relative z-10 flex h-full flex-col items-center justify-center gap-2 p-4"
                >
                  <Image
                    src="https://df2profiler.com/gamemap/map_background.png"
                    fill
                    alt="map"
                    objectFit="cover"
                    className="-z-1"
                  />

                  <h2 className="text-lg font-bold text-background dark:text-foreground">Quest Map</h2>
                  <p className="text-sm text-secondary dark:text-muted-foreground">Redesign of DF2Profiler</p>
                </Link>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Chest Puzzles Link */}
        <div className="absolute -right-[25%] bottom-[5%] md:right-[30%]">
          <CardContainer>
            <CardBody>
              <CardItem
                translateZ={15}
                as="div"
                className="h-48 w-72 rounded-lg bg-muted opacity-70 shadow-lg transition-opacity duration-300 hover:opacity-90 xl:w-80"
              >
                <Link
                  href="/battle/chest-puzzles"
                  className="flex h-full flex-col items-center justify-center gap-2 p-4"
                >
                  <h2 className="text-lg font-bold">Chest Puzzles</h2>
                  <p className="text-sm text-muted-foreground">About the website</p>
                </Link>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>

        {/* Github Link */}
        <div className="absolute right-[20%] bottom-[35%]">
          <CardContainer>
            <CardBody>
              <CardItem
                translateZ={15}
                as="div"
                className="h-16 w-16 rounded-lg bg-muted opacity-70 shadow-lg transition-opacity duration-300 hover:opacity-90"
              >
                <Link href="https://github.com/Oscar0159/df2-helper" target="_blank">
                  <Image fill alt="Github" src={Github} className="object-contain p-2 dark:invert" />
                </Link>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>

      {/* Main Title */}
      <div className="flex h-dvh flex-col items-center justify-center gap-8 px-4">
        <TextGenerateEffect
          words="Some useful things for Dead Frontier 2"
          className={cn(
            'bg-opacity-50 bg-clip-text text-center text-3xl font-bold text-transparent md:text-5xl xl:text-7xl',
            'bg-gradient-to-b from-neutral-400 to-neutral-900',
            'dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400',
          )}
        ></TextGenerateEffect>
      </div>
    </main>
  );
}
