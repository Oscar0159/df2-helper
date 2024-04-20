'use client';

import { ArrowLeftRightIcon, ArrowRightIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const letters = [
    'ART',
    'DAY',
    'EYE',
    'GUY',
    'JOB',
    'KID',
    'LAW',
    'LOT',
    'MAN',
    'WAR',

    'AREA',
    'BACK',
    'BODY',
    'BOOK',
    'CASE',
    'CITY',
    'DOOR',
    'FACE',
    'FACT',
    'GAME',
    'GIRL',
    'HAND',
    'HEAD',
    'HOME',
    'HOUR',
    'IDEA',
    'LIFE',
    'LINE',
    'NAME',
    'PART',
    'ROOM',
    'SIDE',
    'TEAM',
    'TIME',
    'WEEK',
    'WORD',
    'WORK',
    'YEAR',

    'CHILD',
    'FORCE',
    'GROUP',
    'HOUSE',
    'ISSUE',
    'LEVEL',
    'MONEY',
    'MONTH',
    'NIGHT',
    'PARTY',
    'PLACE',
    'POINT',
    'POWER',
    'RIGHT',
    'SPACE',
    'STATE',
    'STORY',
    'STUDY',
    'TASTE',
    'THING',
    'WATER',
    'WOMAN',
    'WORLD',

    'CHANGE',
    'FAMILY',
    'FATHER',
    'FRIEND',
    'HEALTH',
    'MEMBER',
    'MINUTE',
    'MOMENT',
    'MOTHER',
    'NUMBER',
    'OFFICE',
    'OTHERS',
    'PARENT',
    'PEOPLE',
    'PERSON',
    'REASON',
    'RESULT',
    'SCHOOL',
    'SYSTEM',

    'BUSINESS',
    'COMMUNITY',
    'COMPANY',
    'COUNTRY',
    'EDUCATION',
    'GOVERNMENT',
    'HISTORY',
    'INFORMATION',
    'MORNING',
    'PRESIDENT',
    'PROBLEM',
    'PROGRAM',
    'QUESTION',
    'RESEARCH',
    'SERVICE',
    'STUDENT',
    'TEACHER',
];

function findLetter(letter: string, mode: string) {
    if (mode === 'find') {
        const sortLetter = letter.split('').sort().join('');
        for (const word of letters) {
            const sortWord = word.split('').sort().join('');
            if (sortLetter === sortWord) {
                return word;
            }
        }
        return 'Not Found';
    }

    // mode === 'guess'
    // generate regex pattern (space -> any character)
    const pattern = new RegExp(`^${letter.replace(/ /g, '[A-Z]')}$`, 'i');
    const result = letters.filter((word) => pattern.test(word));
    return result.join(' ');
}

export default function Letter() {
    const [letter, setletter] = useState('');

    const mode = letter.includes(' ') ? 'guess' : 'find';

    const result = findLetter(letter.toUpperCase(), mode);

    const t = useTranslations('LetterPage');

    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center p-5">
                <div className="w-full sm:px-10 xl:px-20">
                    <Label htmlFor="letter" className="text-xl">
                        letter
                    </Label>
                    <Input
                        autoFocus
                        type="text"
                        id="letter"
                        value={letter}
                        onChange={(e) => setletter(e.target.value)}
                        placeholder="WORD"
                    />
                </div>
                <ArrowLeftRightIcon size={40} className="mt-7 rotate-90" />
                <div className="p-3 text-7xl sm:text-9xl">{result}</div>
            </div>

            {/* desktop view */}
            <div className="flex justify-center">
                <div className="gap-6 hidden sm:flex justify-between w-5/6">
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">3 letter</h2>
                        <div className="flex flex-col gap-2 text-lg">
                            {letters
                                .filter((word) => word.length === 3)
                                .map((word) => (
                                    <span key={word}>{word}</span>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">4 letter</h2>
                        <div className="flex flex-col gap-2 text-lg">
                            {letters
                                .filter((word) => word.length === 4)
                                .map((word) => (
                                    <span key={word}>{word}</span>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">5 letter</h2>
                        <div className="flex flex-col gap-2 text-lg">
                            {letters
                                .filter((word) => word.length === 5)
                                .map((word) => (
                                    <span key={word}>{word}</span>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">6 letter</h2>
                        <div className="flex flex-col gap-2 text-lg">
                            {letters
                                .filter((word) => word.length === 6)
                                .map((word) => (
                                    <span key={word}>{word}</span>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-semibold">6+ letter</h2>
                        <div className="flex flex-col gap-2 text-lg">
                            {letters
                                .filter((word) => word.length > 6)
                                .map((word) => (
                                    <span key={word}>{word}</span>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* mobile view */}
            <div className="flex flex-col gap-6 sm:hidden">
                <Card>
                    <Collapsible>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>3 letter</CardTitle>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDownIcon className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                            <CardContent className="flex flex-col gap-2 text-lg">
                                {letters
                                    .filter((word) => word.length === 3)
                                    .map((word) => (
                                        <span key={word}>{word}</span>
                                    ))}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
                <Card>
                    <Collapsible>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>4 letter</CardTitle>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDownIcon className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                            <CardContent className="flex flex-col gap-2 text-lg">
                                {letters
                                    .filter((word) => word.length === 4)
                                    .map((word) => (
                                        <span key={word}>{word}</span>
                                    ))}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
                <Card>
                    <Collapsible>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>5 letter</CardTitle>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDownIcon className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                            <CardContent className="flex flex-col gap-2 text-lg">
                                {letters
                                    .filter((word) => word.length === 5)
                                    .map((word) => (
                                        <span key={word}>{word}</span>
                                    ))}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
                <Card>
                    <Collapsible>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>6 letter</CardTitle>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDownIcon className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                            <CardContent className="flex flex-col gap-2 text-lg">
                                {letters
                                    .filter((word) => word.length === 6)
                                    .map((word) => (
                                        <span key={word}>{word}</span>
                                    ))}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
                <Card>
                    <Collapsible>
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>6+ letter</CardTitle>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDownIcon className="h-4 w-4" />
                                </Button>
                            </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                            <CardContent className="flex flex-col gap-2 text-lg">
                                {letters
                                    .filter((word) => word.length > 6)
                                    .map((word) => (
                                        <span key={word}>{word}</span>
                                    ))}
                            </CardContent>
                        </CollapsibleContent>
                    </Collapsible>
                </Card>
            </div>
        </div>
    );
}
