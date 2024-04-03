import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type Props = {
    params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('HomePage');

    return <h1>{t('title')}</h1>;
}
