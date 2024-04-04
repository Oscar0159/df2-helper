import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Link } from '@/navigation';
import BreadcrumbNav from '@/components/breadcrumb-nav';

type Props = {
    params: { locale: string };
};

export default function Blueprint({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);
    
    const t = useTranslations('BlueprintPage');

    return (
        <main className="w-full p-5 pb-24 sm:pb-5 sm:pt-8">
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className='mt-2' />
            </div>
        </main>
    );
}
