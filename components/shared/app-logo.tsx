import { cn } from '@/lib/utils';

type AppLogoProps = {
  className?: string;
  variant?: 'header' | 'hero';
};

export function AppLogoMark({ className, variant = 'header' }: AppLogoProps) {
  const isHero = variant === 'hero';

  return (
    <svg
      viewBox="0 0 72 116"
      aria-hidden="true"
      className={cn('shrink-0', isHero ? 'h-16 w-10 sm:h-20 sm:w-12' : 'h-8 w-5', className)}
      fill="none"
    >
      <g fill="currentColor">
        <path d="M10 6 L28 7 L25 18 L25 90 L29 111 L11 110 L14 94 L12 88 L14 24 L10 17 Z" />
        <path d="M42 6 L60 7 L57 18 L57 90 L61 111 L43 110 L46 94 L44 88 L46 24 L42 17 Z" />
      </g>
    </svg>
  );
}

export function AppLogoWordmark({ className, variant = 'header' }: AppLogoProps) {
  const isHero = variant === 'hero';

  return (
    <span className={cn('leading-none', className)}>
      <span
        className={cn(
          'text-foreground block font-black tracking-[0.22em] uppercase',
          isHero ? 'text-4xl sm:text-5xl' : 'text-sm',
        )}
      >
        DF2
      </span>
      <span
        className={cn(
          'text-muted-foreground block uppercase',
          isHero
            ? 'mt-2 text-[0.72rem] tracking-[0.48em] sm:text-sm'
            : 'mt-0.5 text-[0.55rem] tracking-[0.34em]',
        )}
      >
        Helper
      </span>
    </span>
  );
}

export function AppLogo({ className, variant = 'header' }: AppLogoProps) {
  const isHero = variant === 'hero';

  return (
    <div
      className={cn('inline-flex items-center', isHero ? 'gap-4 sm:gap-5' : 'gap-2.5', className)}
    >
      <AppLogoMark variant={variant} />
      <AppLogoWordmark variant={variant} />
    </div>
  );
}
