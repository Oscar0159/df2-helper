'use client';

import { useState } from 'react';
import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Digital() {
    const [digitalNumber, setDigitalNumber] = useState('');

    const numbers = digitalNumber.split(' ').map((digitStr) => {
        const digit = parseInt(digitStr, 2);
        return isNaN(digit) ? '?' : digit.toString();
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center p-5">
                <div className="w-full lg:px-24">
                    <Label className="text-xl">Binary Number</Label>
                    <Input
                        size={60}
                        type="text"
                        value={digitalNumber}
                        onChange={(e) => setDigitalNumber(e.target.value)}
                        placeholder="010 111 100 101"
                    />
                </div>
                <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                <div className="p-3 text-7xl lg:text-9xl">{numbers.join(' ')}</div>
            </div>

            <div className="grid grid-flow-col grid-rows-5 place-items-center gap-x-12 gap-y-8 p-6 pt-2 text-2xl lg:grid-rows-5 lg:gap-y-12 lg:pt-10">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-5 place-items-center gap-2">
                        <span className="col-span-2">{index.toString(2).padStart(3, '0')}</span>
                        <ArrowRightIcon size={20} className="w-10" />
                        <span className="col-span-2">{index}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
