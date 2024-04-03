'use client';

import { useState } from 'react';
import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Letters() {
    const [number, setNumber] = useState('');

    const letters = number.split(' ').map((numberStr) => {
        const number = parseInt(numberStr, 10);
        return isNaN(number) ? '?' : String.fromCharCode(65 + number - 1);
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center p-5">
                <div className="w-full lg:px-24">
                    <Label className="text-xl">Number</Label>
                    <Input
                        size={60}
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="XX XX XX XX"
                    />
                </div>
                <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                <div className="p-3 text-7xl lg:text-9xl">{letters.join(' ')}</div>
            </div>

            <div className="grid grid-flow-col grid-rows-9 place-items-center gap-x-12 gap-y-4 p-6 pt-2 text-2xl lg:grid-rows-8 lg:gap-y-6 lg:pt-10">
                {Array.from({ length: 26 }).map((_, index) => (
                    <div key={index} className="grid grid-cols-3 place-items-center gap-2">
                        <span>{(index + 1).toString().padStart(2, '0')}</span>
                        <ArrowRightIcon size={20} className="w-10" />
                        <span>{String.fromCharCode(65 + index)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
