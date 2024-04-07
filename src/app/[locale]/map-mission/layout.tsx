import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'MapMissionPage' });

    return {
        title: {
            template: `%s | ${t('title')}`,
            default: t('title'),
        },
        description: t('description'),
    };
}

export default function Layout({ children }: Props) {
    return children;
}
