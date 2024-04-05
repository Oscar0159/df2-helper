'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function Letters() {
    const [number, setNumber] = useState('');

    const t = useTranslations('LettersPage');

    const letters = number.split(' ').map((numberStr) => {
        const number = parseInt(numberStr, 10);
        return isNaN(number) ? '?' : String.fromCharCode(65 + number - 1);
    });

    return (
        <>
            <div>
                <h1 className="text-4xl font-semibold">{t('title')}</h1>
                <BreadcrumbNav className="mt-2" />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col items-center p-5">
                    <div className="w-full sm:px-10 xl:px-20">
                        <Label className="text-xl">Number</Label>
                        <Input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="XX XX XX XX"
                        />
                    </div>
                    <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                    <div className="p-3 text-7xl sm:text-9xl">{letters.join(' ')}</div>
                </div>

                <div className="grid grid-flow-col grid-rows-9 place-items-center gap-x-12 gap-y-4 p-6 pt-2 text-2xl sm:grid-rows-8 xl:gap-y-6 xl:pt-10">
                    {Array.from({ length: 26 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-3 place-items-center gap-2">
                            <span>{(index + 1).toString().padStart(2, '0')}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span>{String.fromCharCode(65 + index)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
