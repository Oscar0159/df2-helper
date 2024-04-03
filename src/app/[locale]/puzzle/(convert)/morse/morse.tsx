'use client';

import { useState } from 'react';
import { ArrowLeftRightIcon, ArrowRightIcon } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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

const LetterMorseMap = {
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

const morseMap = { ...LetterMorseMap, ...numberMorsetMap };

export default function Morse() {
    const [morse, setMorse] = useState('');

    const chars = morse.split(' ').map((morseChar) => {
        const char = Object.entries(morseMap).find(([, morse]) => morse === morseChar);
        return char ? char[0] : '?';
    });

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center p-5">
                <div className="w-full lg:px-24">
                    <Label className="text-xl">Morse Code</Label>
                    <Input
                        size={60}
                        type="text"
                        value={morse}
                        onChange={(e) => setMorse(e.target.value)}
                        placeholder=".- -... -.-."
                    />
                </div>
                <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                <div className="p-3 text-7xl lg:text-9xl">{chars.join(' ')}</div>
            </div>

            <div className="flex flex-col items-center xl:flex-row xl:justify-center">
                <div className="grid grid-flow-col grid-rows-5 place-items-center gap-x-12 gap-y-4 p-6 pt-2 text-2xl lg:pt-10">
                    {Object.entries(numberMorsetMap).map(([char, morse]) => (
                        <div key={char} className="grid grid-cols-5 place-items-center gap-2">
                            <span>{char}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span className="col-span-3 text-lg">
                                {morse.replace(/\-/g, '━').replace(/\./g, '•').split('').join(' ')}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="grid-rows-13 grid grid-flow-col place-items-center gap-x-12 gap-y-4 p-6 pt-2 text-2xl lg:grid-rows-9 lg:pt-10">
                    {Object.entries(LetterMorseMap).map(([char, morse]) => (
                        <div key={char} className="grid grid-cols-5 place-items-center gap-2">
                            <span>{char}</span>
                            <ArrowRightIcon size={20} className="w-10" />
                            <span className="col-span-3 text-lg">
                                {morse.replace(/\-/g, '━').replace(/\./g, '•').split('').join(' ')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
