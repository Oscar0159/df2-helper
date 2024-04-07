'use client';

import { usePathname, useRouter } from '@/navigation';
import { SelectProps } from '@radix-ui/react-select';
import { useLocale } from 'next-intl';
import { ChangeEvent, ReactNode, useTransition } from 'react';

import { Select } from '@/components/ui/select';

type Props = {
    children: ReactNode;
} & SelectProps;

export default function LocaleSwitcherSelect({ children, ...props }: Props) {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const onValueChange = (value: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: value });
        });
    };

    return (
        <Select value={locale} onValueChange={onValueChange} {...props}>
            {children}
        </Select>
    );
}
