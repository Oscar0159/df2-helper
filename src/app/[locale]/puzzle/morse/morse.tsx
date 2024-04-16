'use client';

import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import BreadcrumbNav from '@/components/breadcrumb-nav';

const numberMorsetMap = {
    0: '-----',
    1: '.----',
    2: '..---',
    3: '...--',
    4: '....-',
    5: '.....',
    6: '-....',
    7: '--...',
    8: '---..',
    9: '----.',
};

const AlphabetMorseMap = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
};

const morseMap = { ...AlphabetMorseMap, ...numberMorsetMap };

export default function Morse() {
    const [morse, setMorse] = useState('');

    const t = useTranslations('MorsePage');

    const chars = morse.split(' ').map((morseChar) => {
        const char = Object.entries(morseMap).find(([, morse]) => morse === morseChar);
        return char ? char[0] : '?';
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center p-5">
                <div className="w-full sm:px-10 xl:px-20">
                    <Label htmlFor="morse" className="text-xl">
                        Morse Code
                    </Label>
                    <Input
                        size={60}
                        type="text"
                        id="morse"
                        value={morse}
                        onChange={(e) => setMorse(e.target.value)}
                        placeholder=".- -... -.-."
                    />
                </div>
                <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                <div className="p-3 text-7xl sm:text-9xl">{chars.join(' ')}</div>
            </div>

            <div className="flex flex-col items-center xl:flex-row xl:justify-center">
                <div className="grid grid-flow-col grid-rows-5 place-items-center gap-x-12 gap-y-4 p-6 pt-2 sm:text-2xl xl:pt-10">
                    {Object.entries(numberMorsetMap).map(([char, morse]) => (
                        <div key={char} className="grid grid-cols-5 place-items-center gap-2">
                            <span>{char}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span className="col-span-3 text-xs sm:text-2xl">
                                {morse.replace(/\-/g, '━').replace(/\./g, '•').split('').join(' ')}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid grid-flow-col grid-rows-13 place-items-center gap-x-12 gap-y-4 p-6 pt-2 sm:grid-rows-9 sm:text-2xl xl:grid-rows-9 xl:pt-10">
                    {Object.entries(AlphabetMorseMap).map(([char, morse]) => (
                        <div key={char} className="grid grid-cols-5 place-items-center gap-2">
                            <span>{char}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span className="col-span-3 text-xs sm:text-2xl">
                                {morse.replace(/\-/g, '━').replace(/\./g, '•').split('').join(' ')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
