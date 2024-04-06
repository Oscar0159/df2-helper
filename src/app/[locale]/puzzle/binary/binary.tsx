'use client';

import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import BreadcrumbNav from '@/components/breadcrumb-nav';

export default function Binary() {
    const [binaryNumber, setBinaryNumber] = useState('');

    const t = useTranslations('BinaryPage');

    const numbers = binaryNumber.split(' ').map((binaryStr) => {
        const binary = parseInt(binaryStr, 2);
        return isNaN(binary) ? '?' : binary.toString();
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
                        <Label className="text-xl">Binary Number</Label>
                        <Input
                            type="text"
                            value={binaryNumber}
                            onChange={(e) => setBinaryNumber(e.target.value)}
                            placeholder="010 111 100 101"
                        />
                    </div>
                    <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                    <div className="p-3 text-7xl sm:text-9xl">{numbers.join(' ')}</div>
                </div>

                <div className="grid grid-flow-col grid-rows-5 place-items-center gap-x-12 gap-y-8 p-6 pt-2 text-2xl xl:grid-rows-5 xl:gap-y-12 xl:pt-10">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-5 place-items-center gap-2">
                            <span className="col-span-2">{index.toString(2).padStart(3, '0')}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span className="col-span-2">{index}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
