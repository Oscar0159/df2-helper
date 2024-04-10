import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: {
            template: `%s | ${t('PuzzlePage.title')} | ${t('LocaleLayout.title')}`,
            default: t('PuzzlePage.title'),
        },
        description: t('PuzzlePage.description'),
    };
}

export default function Layout({ children }: Props) {
    return children;
}
