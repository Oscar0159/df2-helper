import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import BreadcrumbNav from '@/components/breadcrumb-nav';

type Props = {
    params: { locale: string };
};

type BasicItem = {
    title: string;
    content: string;
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
    const t = await getTranslations({ locale });

    return {
        title: t('basic-page.title'),
        description: t('basic-page.description'),
        openGraph: {
            title: t('basic-page.title'),
            description: t('basic-page.description'),
            url: `https://df2-helper.vercel.app/${locale}/information/basic`,
            siteName: t('locale-layout.title'),
            locale: locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('basic-page.title'),
            description: t('basic-page.description'),
            site: t('locale-layout.title'),
        },
    };
}

export default function Basic({ params: { locale } }: Props) {
    // Enable static rendering
    unstable_setRequestLocale(locale);

    const t = useTranslations('basic-page');

    const BasicItems: BasicItem[] = [
        {
            title: t('when-to-reset.title'),
            content: t('when-to-reset.content'),
        },
        {
            title: t('what-is-red-building.title'),
            content: t('what-is-red-building.content'),
        },
        {
            title: t('what-is-oa.title'),
            content: t('what-is-oa.content'),
        },
        {
            title: t('what-is-hr-sm.title'),
            content: t('what-is-hr-sm.content'),
        },
        {
            title: t('any-place-increase-chance.title'),
            content: t('any-place-increase-chance.content'),
        },
        {
            title: t('about-speed.title'),
            content: t('about-speed.content'),
        },
        {
            title: t('about-tax.title'),
            content: t('about-tax.content'),
        },
    ];

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="mt-4">
                <Accordion type="multiple">
                    {BasicItems.map((item, index) => (
                        <AccordionItem key={index} value={item.title}>
                            <AccordionTrigger>
                                <h2 className="text-left text-lg font-semibold">{item.title}</h2>
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>{item.content}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </>
    );
}
