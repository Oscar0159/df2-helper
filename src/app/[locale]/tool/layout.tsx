import { ReactNode } from 'react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
    children: ReactNode;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'ToolPage' });

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