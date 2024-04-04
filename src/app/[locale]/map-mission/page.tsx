import { useTranslations } from 'next-intl';

import { Link } from '@/navigation';
import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function MapMission() {
    const t = useTranslations('MapMissionPage');

    return (
        <main className="w-full p-5 pb-24 sm:pb-5 sm:pt-8">
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className='mt-2' />
            </div>
        </main>
    );
}
