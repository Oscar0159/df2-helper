'use client';

import { useLocale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';

import { SelectProps } from '@radix-ui/react-select';
import { Select } from '@/components/ui/select';
import { useRouter, usePathname } from '@/navigation';

type Props = {
    children: ReactNode;
} & SelectProps;

export default function LocaleSwitcherSelect({ children, ...props }: Props) {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    //     const nextLocale = event.target.value;
    //     startTransition(() => {
    //         router.replace(
    //             // @ts-expect-error -- TypeScript will validate that only known `params`
    //             // are used in combination with a given `pathname`. Since the two will
    //             // always match for the current route, we can skip runtime checks.
    //             pathname,
    //             { locale: nextLocale }
    //         );
    //     });
    // }

    const onValueChange = (value: string) => {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                pathname,
                { locale: value }
            );
        });
    };

    return (
        <Select value={locale} onValueChange={onValueChange} {...props}>
            {children}
        </Select>
    );
}
