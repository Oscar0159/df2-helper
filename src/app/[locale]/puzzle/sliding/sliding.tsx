'use client';

import { useDebounce } from '@uidotdev/usehooks';
import { FileDigitIcon, KeyboardIcon, LightbulbIcon, LightbulbOffIcon, MouseIcon, RotateCwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import * as slidingPuzzleSolver from '@/lib/sliding-puzzle-solver';
import { cn } from '@/lib/utils';

import dragon1_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-1-3-2.png';
import dragon2_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-2-3-2.png';
import dragon3_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-3-3-2.png';
import dragon4_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-4-3-2.png';
import dragon5_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-5-3-2.png';
import dragon6_3_2Image from '@/../public/images/puzzle/sliding/3x2/dragon-6-3-2.png';
import horse1_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-1-3-2.png';
import horse2_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-2-3-2.png';
import horse3_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-3-3-2.png';
import horse4_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-4-3-2.png';
import horse5_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-5-3-2.png';
import horse6_3_2Image from '@/../public/images/puzzle/sliding/3x2/horse-6-3-2.png';
import musee1_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-1-3-2.png';
import musee2_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-2-3-2.png';
import musee3_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-3-3-2.png';
import musee4_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-4-3-2.png';
import musee5_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-5-3-2.png';
import musee6_3_2Image from '@/../public/images/puzzle/sliding/3x2/musee-6-3-2.png';
import saintAnthony1_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-1-3-2.png';
import saintAnthony2_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-2-3-2.png';
import saintAnthony3_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-3-3-2.png';
import saintAnthony4_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-4-3-2.png';
import saintAnthony5_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-5-3-2.png';
import saintAnthony6_3_2Image from '@/../public/images/puzzle/sliding/3x2/saint-6-3-2.png';
import satanAndDeath1_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-1-3-2.png';
import satanAndDeath2_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-2-3-2.png';
import satanAndDeath3_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-3-3-2.png';
import satanAndDeath4_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-4-3-2.png';
import satanAndDeath5_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-5-3-2.png';
import satanAndDeath6_3_2Image from '@/../public/images/puzzle/sliding/3x2/satan-6-3-2.png';
import saturnDevouring1_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-1-3-2.png';
import saturnDevouring2_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-2-3-2.png';
import saturnDevouring3_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-3-3-2.png';
import saturnDevouring4_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-4-3-2.png';
import saturnDevouring5_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-5-3-2.png';
import saturnDevouring6_3_2Image from '@/../public/images/puzzle/sliding/3x2/saturn-6-3-2.png';
import severedHeads1_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-1-3-2.png';
import severedHeads2_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-2-3-2.png';
import severedHeads3_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-3-3-2.png';
import severedHeads4_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-4-3-2.png';
import severedHeads5_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-5-3-2.png';
import severedHeads6_3_2Image from '@/../public/images/puzzle/sliding/3x2/severed-6-3-2.png';
import witchesSabbath1_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-1-3-2.png';
import witchesSabbath2_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-2-3-2.png';
import witchesSabbath3_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-3-3-2.png';
import witchesSabbath4_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-4-3-2.png';
import witchesSabbath5_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-5-3-2.png';
import witchesSabbath6_3_2Image from '@/../public/images/puzzle/sliding/3x2/witches-6-3-2.png';
import dragon1_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-1-3-3.png';
import dragon2_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-2-3-3.png';
import dragon3_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-3-3-3.png';
import dragon4_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-4-3-3.png';
import dragon5_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-5-3-3.png';
import dragon6_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-6-3-3.png';
import dragon7_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-7-3-3.png';
import dragon8_3_3Image from '@/../public/images/puzzle/sliding/3x3/dragon-8-3-3.png';
import horse1_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-1-3-3.png';
import horse2_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-2-3-3.png';
import horse3_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-3-3-3.png';
import horse4_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-4-3-3.png';
import horse5_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-5-3-3.png';
import horse6_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-6-3-3.png';
import horse7_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-7-3-3.png';
import horse8_3_3Image from '@/../public/images/puzzle/sliding/3x3/horse-8-3-3.png';
import musee1_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-1-3-3.png';
import musee2_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-2-3-3.png';
import musee3_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-3-3-3.png';
import musee4_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-4-3-3.png';
import musee5_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-5-3-3.png';
import musee6_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-6-3-3.png';
import musee7_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-7-3-3.png';
import musee8_3_3Image from '@/../public/images/puzzle/sliding/3x3/musee-8-3-3.png';
import saintAnthony1_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-1-3-3.png';
import saintAnthony2_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-2-3-3.png';
import saintAnthony3_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-3-3-3.png';
import saintAnthony4_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-4-3-3.png';
import saintAnthony5_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-5-3-3.png';
import saintAnthony6_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-6-3-3.png';
import saintAnthony7_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-7-3-3.png';
import saintAnthony8_3_3Image from '@/../public/images/puzzle/sliding/3x3/saint-8-3-3.png';
import satanAndDeath1_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-1-3-3.png';
import satanAndDeath2_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-2-3-3.png';
import satanAndDeath3_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-3-3-3.png';
import satanAndDeath4_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-4-3-3.png';
import satanAndDeath5_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-5-3-3.png';
import satanAndDeath6_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-6-3-3.png';
import satanAndDeath7_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-7-3-3.png';
import satanAndDeath8_3_3Image from '@/../public/images/puzzle/sliding/3x3/satan-8-3-3.png';
import saturnDevouring1_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-1-3-3.png';
import saturnDevouring2_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-2-3-3.png';
import saturnDevouring3_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-3-3-3.png';
import saturnDevouring4_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-4-3-3.png';
import saturnDevouring5_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-5-3-3.png';
import saturnDevouring6_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-6-3-3.png';
import saturnDevouring7_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-7-3-3.png';
import saturnDevouring8_3_3Image from '@/../public/images/puzzle/sliding/3x3/saturn-8-3-3.png';
import severedHeads1_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-1-3-3.png';
import severedHeads2_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-2-3-3.png';
import severedHeads3_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-3-3-3.png';
import severedHeads4_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-4-3-3.png';
import severedHeads5_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-5-3-3.png';
import severedHeads6_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-6-3-3.png';
import severedHeads7_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-7-3-3.png';
import severedHeads8_3_3Image from '@/../public/images/puzzle/sliding/3x3/severed-8-3-3.png';
import witchesSabbath1_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-1-3-3.png';
import witchesSabbath2_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-2-3-3.png';
import witchesSabbath3_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-3-3-3.png';
import witchesSabbath4_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-4-3-3.png';
import witchesSabbath5_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-5-3-3.png';
import witchesSabbath6_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-6-3-3.png';
import witchesSabbath7_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-7-3-3.png';
import witchesSabbath8_3_3Image from '@/../public/images/puzzle/sliding/3x3/witches-8-3-3.png';
import dragonImage from '@/../public/images/puzzle/sliding/dragon.png';
import horseImage from '@/../public/images/puzzle/sliding/horse.png';
import museeImage from '@/../public/images/puzzle/sliding/musee.png';
import saintAnthonyImage from '@/../public/images/puzzle/sliding/saint.png';
import satanAndDeathImage from '@/../public/images/puzzle/sliding/satan.png';
import saturnDevouringImage from '@/../public/images/puzzle/sliding/saturn.png';
import severedHeadsImage from '@/../public/images/puzzle/sliding/severed.png';
import witchesSabbathImage from '@/../public/images/puzzle/sliding/witches.png';

const sizeOptions = [
    { rows: 3, cols: 2 },
    { rows: 3, cols: 3 },
];

const images = [
    {
        src: dragonImage.src,
        alt: 'El gran dragón rojo',
        id: 'dragon',
        crop3x2: [
            { src: dragon1_3_2Image.src, alt: 'El gran dragón rojo 1 - 3x2', id: 'dragon1' },
            { src: dragon2_3_2Image.src, alt: 'El gran dragón rojo 2 - 3x2', id: 'dragon2' },
            { src: dragon3_3_2Image.src, alt: 'El gran dragón rojo 3 - 3x2', id: 'dragon3' },
            { src: dragon4_3_2Image.src, alt: 'El gran dragón rojo 4 - 3x2', id: 'dragon4' },
            { src: dragon5_3_2Image.src, alt: 'El gran dragón rojo 5 - 3x2', id: 'dragon5' },
            { src: dragon6_3_2Image.src, alt: 'El gran dragón rojo 6 - 3x2', id: 'dragon6' },
        ],
        crop3x3: [
            { src: dragon1_3_3Image.src, alt: 'El gran dragón rojo 1 - 3x3', id: 'dragon1' },
            { src: dragon2_3_3Image.src, alt: 'El gran dragón rojo 2 - 3x3', id: 'dragon2' },
            { src: dragon3_3_3Image.src, alt: 'El gran dragón rojo 3 - 3x3', id: 'dragon3' },
            { src: dragon4_3_3Image.src, alt: 'El gran dragón rojo 4 - 3x3', id: 'dragon4' },
            { src: dragon5_3_3Image.src, alt: 'El gran dragón rojo 5 - 3x3', id: 'dragon5' },
            { src: dragon6_3_3Image.src, alt: 'El gran dragón rojo 6 - 3x3', id: 'dragon6' },
            { src: dragon7_3_3Image.src, alt: 'El gran dragón rojo 7 - 3x3', id: 'dragon7' },
            { src: dragon8_3_3Image.src, alt: 'El gran dragón rojo 8 - 3x3', id: 'dragon8' },
        ],
    },
    {
        src: horseImage.src,
        alt: 'Diomedes Devoured by His Horses by Gustave Moreau',
        id: 'horse',
        crop3x2: [
            { src: horse1_3_2Image.src, alt: 'Diomedes Devoured by His Horses 1 - 3x2', id: 'horse1' },
            { src: horse2_3_2Image.src, alt: 'Diomedes Devoured by His Horses 2 - 3x2', id: 'horse2' },
            { src: horse3_3_2Image.src, alt: 'Diomedes Devoured by His Horses 3 - 3x2', id: 'horse3' },
            { src: horse4_3_2Image.src, alt: 'Diomedes Devoured by His Horses 4 - 3x2', id: 'horse4' },
            { src: horse5_3_2Image.src, alt: 'Diomedes Devoured by His Horses 5 - 3x2', id: 'horse5' },
            { src: horse6_3_2Image.src, alt: 'Diomedes Devoured by His Horses 6 - 3x2', id: 'horse6' },
        ],
        crop3x3: [
            { src: horse1_3_3Image.src, alt: 'Diomedes Devoured by His Horses 1 - 3x3', id: 'horse1' },
            { src: horse2_3_3Image.src, alt: 'Diomedes Devoured by His Horses 2 - 3x3', id: 'horse2' },
            { src: horse3_3_3Image.src, alt: 'Diomedes Devoured by His Horses 3 - 3x3', id: 'horse3' },
            { src: horse4_3_3Image.src, alt: 'Diomedes Devoured by His Horses 4 - 3x3', id: 'horse4' },
            { src: horse5_3_3Image.src, alt: 'Diomedes Devoured by His Horses 5 - 3x3', id: 'horse5' },
            { src: horse6_3_3Image.src, alt: 'Diomedes Devoured by His Horses 6 - 3x3', id: 'horse6' },
            { src: horse7_3_3Image.src, alt: 'Diomedes Devoured by His Horses 7 - 3x3', id: 'horse7' },
            { src: horse8_3_3Image.src, alt: 'Diomedes Devoured by His Horses 8 - 3x3', id: 'horse8' },
        ],
    },
    {
        src: museeImage.src,
        alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris",
        id: 'musee',
        crop3x2: [
            {
                src: musee1_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 1 - 3x2",
                id: 'musee1',
            },
            {
                src: musee2_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 2 - 3x2",
                id: 'musee2',
            },
            {
                src: musee3_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 3 - 3x2",
                id: 'musee3',
            },
            {
                src: musee4_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 4 - 3x2",
                id: 'musee4',
            },
            {
                src: musee5_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 5 - 3x2",
                id: 'musee5',
            },
            {
                src: musee6_3_2Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 6 - 3x2",
                id: 'musee6',
            },
        ],
        crop3x3: [
            {
                src: musee1_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 1 - 3x3",
                id: 'musee1',
            },
            {
                src: musee2_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 2 - 3x3",
                id: 'musee2',
            },
            {
                src: musee3_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 3 - 3x3",
                id: 'musee3',
            },
            {
                src: musee4_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 4 - 3x3",
                id: 'musee4',
            },
            {
                src: musee5_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 5 - 3x3",
                id: 'musee5',
            },
            {
                src: musee6_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 6 - 3x3",
                id: 'musee6',
            },
            {
                src: musee7_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 7 - 3x3",
                id: 'musee7',
            },
            {
                src: musee8_3_3Image.src,
                alt: "franz von stuck wilde jagd 1899 - musee d'orsay paris 8 - 3x3",
                id: 'musee8',
            },
        ],
    },
    {
        src: saintAnthonyImage.src,
        alt: 'La tentation de saint Antoine',
        id: 'saint',
        crop3x2: [
            { src: saintAnthony1_3_2Image.src, alt: 'La tentation de saint Antoine 1 - 3x2', id: 'saint1' },
            { src: saintAnthony2_3_2Image.src, alt: 'La tentation de saint Antoine 2 - 3x2', id: 'saint2' },
            { src: saintAnthony3_3_2Image.src, alt: 'La tentation de saint Antoine 3 - 3x2', id: 'saint3' },
            { src: saintAnthony4_3_2Image.src, alt: 'La tentation de saint Antoine 4 - 3x2', id: 'saint4' },
            { src: saintAnthony5_3_2Image.src, alt: 'La tentation de saint Antoine 5 - 3x2', id: 'saint5' },
            { src: saintAnthony6_3_2Image.src, alt: 'La tentation de saint Antoine 6 - 3x2', id: 'saint6' },
        ],
        crop3x3: [
            { src: saintAnthony1_3_3Image.src, alt: 'La tentation de saint Antoine 1 - 3x3', id: 'saint1' },
            { src: saintAnthony2_3_3Image.src, alt: 'La tentation de saint Antoine 2 - 3x3', id: 'saint2' },
            { src: saintAnthony3_3_3Image.src, alt: 'La tentation de saint Antoine 3 - 3x3', id: 'saint3' },
            { src: saintAnthony4_3_3Image.src, alt: 'La tentation de saint Antoine 4 - 3x3', id: 'saint4' },
            { src: saintAnthony5_3_3Image.src, alt: 'La tentation de saint Antoine 5 - 3x3', id: 'saint5' },
            { src: saintAnthony6_3_3Image.src, alt: 'La tentation de saint Antoine 6 - 3x3', id: 'saint6' },
            { src: saintAnthony7_3_3Image.src, alt: 'La tentation de saint Antoine 7 - 3x3', id: 'saint7' },
            { src: saintAnthony8_3_3Image.src, alt: 'La tentation de saint Antoine 8 - 3x3', id: 'saint8' },
        ],
    },
    {
        src: satanAndDeathImage.src,
        alt: 'Satan and Death',
        id: 'satan',
        crop3x2: [
            { src: satanAndDeath1_3_2Image.src, alt: 'Satan and Death 1 - 3x2', id: 'satan1' },
            { src: satanAndDeath2_3_2Image.src, alt: 'Satan and Death 2 - 3x2', id: 'satan2' },
            { src: satanAndDeath3_3_2Image.src, alt: 'Satan and Death 3 - 3x2', id: 'satan3' },
            { src: satanAndDeath4_3_2Image.src, alt: 'Satan and Death 4 - 3x2', id: 'satan4' },
            { src: satanAndDeath5_3_2Image.src, alt: 'Satan and Death 5 - 3x2', id: 'satan5' },
            { src: satanAndDeath6_3_2Image.src, alt: 'Satan and Death 6 - 3x2', id: 'satan6' },
        ],
        crop3x3: [
            { src: satanAndDeath1_3_3Image.src, alt: 'Satan and Death 1 - 3x3', id: 'satan1' },
            { src: satanAndDeath2_3_3Image.src, alt: 'Satan and Death 2 - 3x3', id: 'satan2' },
            { src: satanAndDeath3_3_3Image.src, alt: 'Satan and Death 3 - 3x3', id: 'satan3' },
            { src: satanAndDeath4_3_3Image.src, alt: 'Satan and Death 4 - 3x3', id: 'satan4' },
            { src: satanAndDeath5_3_3Image.src, alt: 'Satan and Death 5 - 3x3', id: 'satan5' },
            { src: satanAndDeath6_3_3Image.src, alt: 'Satan and Death 6 - 3x3', id: 'satan6' },
            { src: satanAndDeath7_3_3Image.src, alt: 'Satan and Death 7 - 3x3', id: 'satan7' },
            { src: satanAndDeath8_3_3Image.src, alt: 'Satan and Death 8 - 3x3', id: 'satan8' },
        ],
    },
    {
        src: saturnDevouringImage.src,
        alt: 'Saturn Devouring His Son by Francisco Goya',
        id: 'saturn',
        crop3x2: [
            { src: saturnDevouring1_3_2Image.src, alt: 'Saturn Devouring His Son 1 - 3x2', id: 'saturn1' },
            { src: saturnDevouring2_3_2Image.src, alt: 'Saturn Devouring His Son 2 - 3x2', id: 'saturn2' },
            { src: saturnDevouring3_3_2Image.src, alt: 'Saturn Devouring His Son 3 - 3x2', id: 'saturn3' },
            { src: saturnDevouring4_3_2Image.src, alt: 'Saturn Devouring His Son 4 - 3x2', id: 'saturn4' },
            { src: saturnDevouring5_3_2Image.src, alt: 'Saturn Devouring His Son 5 - 3x2', id: 'saturn5' },
            { src: saturnDevouring6_3_2Image.src, alt: 'Saturn Devouring His Son 6 - 3x2', id: 'saturn6' },
        ],
        crop3x3: [
            { src: saturnDevouring1_3_3Image.src, alt: 'Saturn Devouring His Son 1 - 3x3', id: 'saturn1' },
            { src: saturnDevouring2_3_3Image.src, alt: 'Saturn Devouring His Son 2 - 3x3', id: 'saturn2' },
            { src: saturnDevouring3_3_3Image.src, alt: 'Saturn Devouring His Son 3 - 3x3', id: 'saturn3' },
            { src: saturnDevouring4_3_3Image.src, alt: 'Saturn Devouring His Son 4 - 3x3', id: 'saturn4' },
            { src: saturnDevouring5_3_3Image.src, alt: 'Saturn Devouring His Son 5 - 3x3', id: 'saturn5' },
            { src: saturnDevouring6_3_3Image.src, alt: 'Saturn Devouring His Son 6 - 3x3', id: 'saturn6' },
            { src: saturnDevouring7_3_3Image.src, alt: 'Saturn Devouring His Son 7 - 3x3', id: 'saturn7' },
            { src: saturnDevouring8_3_3Image.src, alt: 'Saturn Devouring His Son 8 - 3x3', id: 'saturn8' },
        ],
    },
    {
        src: severedHeadsImage.src,
        alt: 'Théodore Géricault - Têtes coupées',
        id: 'severed',
        crop3x2: [
            { src: severedHeads1_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 1 - 3x2', id: 'severed1' },
            { src: severedHeads2_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 2 - 3x2', id: 'severed2' },
            { src: severedHeads3_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 3 - 3x2', id: 'severed3' },
            { src: severedHeads4_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 4 - 3x2', id: 'severed4' },
            { src: severedHeads5_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 5 - 3x2', id: 'severed5' },
            { src: severedHeads6_3_2Image.src, alt: 'Théodore Géricault - Têtes coupées 6 - 3x2', id: 'severed6' },
        ],
        crop3x3: [
            { src: severedHeads1_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 1 - 3x3', id: 'severed1' },
            { src: severedHeads2_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 2 - 3x3', id: 'severed2' },
            { src: severedHeads3_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 3 - 3x3', id: 'severed3' },
            { src: severedHeads4_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 4 - 3x3', id: 'severed4' },
            { src: severedHeads5_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 5 - 3x3', id: 'severed5' },
            { src: severedHeads6_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 6 - 3x3', id: 'severed6' },
            { src: severedHeads7_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 7 - 3x3', id: 'severed7' },
            { src: severedHeads8_3_3Image.src, alt: 'Théodore Géricault - Têtes coupées 8 - 3x3', id: 'severed8' },
        ],
    },
    {
        src: witchesSabbathImage.src,
        alt: 'Francisco de Goya y Lucientes - Witches Sabbath',
        id: 'witches',
        crop3x2: [
            {
                src: witchesSabbath1_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 1 - 3x2',
                id: 'witches1',
            },
            {
                src: witchesSabbath2_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 2 - 3x2',
                id: 'witches2',
            },
            {
                src: witchesSabbath3_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 3 - 3x2',
                id: 'witches3',
            },
            {
                src: witchesSabbath4_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 4 - 3x2',
                id: 'witches4',
            },
            {
                src: witchesSabbath5_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 5 - 3x2',
                id: 'witches5',
            },
            {
                src: witchesSabbath6_3_2Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 6 - 3x2',
                id: 'witches6',
            },
        ],
        crop3x3: [
            {
                src: witchesSabbath1_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 1 - 3x3',
                id: 'witches1',
            },
            {
                src: witchesSabbath2_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 2 - 3x3',
                id: 'witches2',
            },
            {
                src: witchesSabbath3_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 3 - 3x3',
                id: 'witches3',
            },
            {
                src: witchesSabbath4_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 4 - 3x3',
                id: 'witches4',
            },
            {
                src: witchesSabbath5_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 5 - 3x3',
                id: 'witches5',
            },
            {
                src: witchesSabbath6_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 6 - 3x3',
                id: 'witches6',
            },
            {
                src: witchesSabbath7_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 7 - 3x3',
                id: 'witches7',
            },
            {
                src: witchesSabbath8_3_3Image.src,
                alt: 'Francisco de Goya y Lucientes - Witches Sabbath 8 - 3x3',
                id: 'witches8',
            },
        ],
    },
];

export default function Sliding() {
    const [grid, setGrid] = useState(
        Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => (i * 3 + j + 1) % 9))
    );
    const debouncedGrid = useDebounce(grid, 700);
    const [isSolving, setIsSolving] = useState(false);
    const [solution, setSolution] = useState<string[]>([]);
    const [solutionMode, setSolutionMode] = useState<'keyboard' | 'mouse'>('keyboard');
    const [hasSolution, setHasSolution] = useState(false);
    const [showNumbers, setShowNumbers] = useState(true);
    const [showSolution, setShowSolution] = useState(true);
    const [currentImageId, setCurrentImageId] = useState(images[0].id);

    const gridSet = new Set(grid.flat());
    const isSetupFinished = Array.from({ length: grid.length * grid[0].length }, (_, i) => i).every((i) =>
        gridSet.has(i)
    );

    const t = useTranslations('sliding-page');

    const resetGrid = () => {
        setGrid((prev) =>
            Array.from({ length: prev.length }, (_, i) =>
                Array.from(
                    { length: prev[0].length },
                    (_, j) => (i * prev[0].length + j + 1) % (prev.length * prev[0].length)
                )
            )
        );
    };

    const setGridSize = (rows: number, cols: number) => {
        if (!rows || !cols) return;
        if (rows === grid.length && cols === grid[0].length) return;

        const newGrid = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => (i * cols + j + 1) % (rows * cols))
        );

        setGrid(newGrid);
    };

    const swapTiles = (row1: number, col1: number, row2: number, col2: number) => {
        const newGrid = [...grid];
        const temp = newGrid[row1][col1];
        newGrid[row1][col1] = newGrid[row2][col2];
        newGrid[row2][col2] = temp;
        setGrid(newGrid);
    };

    const handleTileClick = (row: number, col: number) => {
        if (row > 0 && grid[row - 1][col] === 0) {
            swapTiles(row, col, row - 1, col);
        } else if (row < 2 && grid[row + 1][col] === 0) {
            swapTiles(row, col, row + 1, col);
        } else if (col > 0 && grid[row][col - 1] === 0) {
            swapTiles(row, col, row, col - 1);
        } else if (col < 2 && grid[row][col + 1] === 0) {
            swapTiles(row, col, row, col + 1);
        }
    };

    useEffect(() => {
        const solve = async () => {
            const { solution, hasSolution } = await slidingPuzzleSolver.solve(debouncedGrid);
            setSolution(solution);
            setHasSolution(hasSolution);
            setIsSolving(false);
        };

        if (isSetupFinished) {
            setIsSolving(true);
            solve();
        }
    }, [debouncedGrid, isSetupFinished]);

    return (
        <div className="grid grid-cols-6 gap-4 h-full items-center">
            {/* puzzle */}
            <div
                className={cn(
                    'col-span-6 flex flex-col gap-4 items-center justify-between h-full pb-2',
                    showSolution ? 'lg:col-span-4' : 'lg:col-span-6'
                )}
            >
                {/* toolbar */}
                <div className="flex sm:gap-6 items-center gap-2 sm:flex-row">
                    <div className="flex items-center gap-1 justify-between">
                        {sizeOptions.map(({ rows, cols }) => (
                            <Button
                                key={`${rows}x${cols}`}
                                variant={grid.length === rows && grid[0].length === cols ? 'default' : 'outline'}
                                onClick={() => setGridSize(rows, cols)}
                                className="text-lg"
                            >
                                {rows}x{cols}
                            </Button>
                        ))}
                    </div>

                    <div className="flex gap-1">
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => {
                                            resetGrid();
                                        }}
                                    >
                                        {<RotateCwIcon />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('reset')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={showNumbers ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => {
                                            setShowNumbers(!showNumbers);
                                        }}
                                    >
                                        {showNumbers ? <FileDigitIcon /> : <FileDigitIcon />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('show-number')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={!hasSolution ? 'destructive' : showSolution ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => {
                                            setShowSolution(!showSolution);
                                        }}
                                    >
                                        {showSolution ? <LightbulbIcon /> : <LightbulbOffIcon />}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>{t('show-solution')}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>

                {/* image selector for mobile */}
                <Carousel className={cn('md:order-last w-3/5 md:flex md:w-5/6 flex-col')} opts={{ dragFree: true }}>
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem
                                key={index}
                                className={cn(showSolution ? 'md:basis-1/4' : 'md:basis-1/4 xl:basis-1/6')}
                            >
                                <Card
                                    className={cn(
                                        'relative border-none transition-opacity duration-300 group/card',
                                        currentImageId !== image.id &&
                                            'dark:opacity-35 opacity-60 dark:hover:opacity-60 hover:opacity-85'
                                    )}
                                    onClick={() => {
                                        setCurrentImageId((prev) => (prev === image.id ? '' : image.id));
                                    }}
                                >
                                    <CardContent className="relative flex aspect-square items-center justify-center">
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            priority
                                            fill
                                            sizes="100% 100%"
                                            loading="eager"
                                            className="cursor-pointer rounded-md  object-cover object-top"
                                        />
                                    </CardContent>
                                    <div className="absolute p-3 group-hover/card:translate-y-0 translate-y-[110%] bg-secondary/70 inset-x-0 bottom-0 rounded-md pointer-events-none transition-all duration-300 group-hover/card:delay-500">
                                        <p>{image.alt}</p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {/* grid */}
                <div
                    className={cn(
                        'grid gap-1',
                        grid.length === 3 && grid[0].length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                    )}
                >
                    {grid.map((row, rowIndex) =>
                        row.map((tile, colIndex) => (
                            <div
                                key={rowIndex * grid[0].length + colIndex}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify({ rowIndex, colIndex }));
                                }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const { rowIndex: targetRowIndex, colIndex: targetColIndex } = JSON.parse(
                                        e.dataTransfer.getData('text/plain')
                                    );
                                    swapTiles(rowIndex, colIndex, targetRowIndex, targetColIndex);
                                }}
                                onClick={() => handleTileClick(rowIndex, colIndex)}
                                className={cn(
                                    'w-28 md:w-36 aspect-square relative border-foreground flex items-center justify-center rounded-md text-6xl transition-transform duration-500',
                                    tile !== 0 && 'cursor-pointer',
                                    tile !== 0 && 'bg-primary text-secondary',
                                    currentImageId && 'text-white'
                                )}
                            >
                                {tile !== 0 && currentImageId && (
                                    <Image
                                        src={
                                            grid.length === 3 && grid[0].length === 2
                                                ? images.find((image) => image.id === currentImageId)?.crop3x2[tile - 1]
                                                      .src ?? ''
                                                : images.find((image) => image.id === currentImageId)?.crop3x3[tile - 1]
                                                      .src ?? ''
                                        }
                                        alt={
                                            grid.length === 3 && grid[0].length === 2
                                                ? images.find((image) => image.id === currentImageId)?.crop3x2[tile - 1]
                                                      .alt ?? ''
                                                : images.find((image) => image.id === currentImageId)?.crop3x3[tile - 1]
                                                      .alt ?? ''
                                        }
                                        priority
                                        fill
                                        sizes="100% 100%"
                                        className="rounded-md object-cover"
                                    />
                                )}
                                <span
                                    className={cn(
                                        'absolute p-2 origin-bottom-left transition-all duration-500 pointer-events-none',
                                        showNumbers && tile !== 0 ? 'flex justify-center items-center' : 'hidden',
                                        images.map((image, index) => image.id).includes(currentImageId)
                                            ? 'bottom-0 left-0 scale-50'
                                            : 'bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2'
                                    )}
                                >
                                    {tile !== 0 && tile}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* solution */}
            <div
                className={cn(
                    'col-span-6 flex-col gap-8 lg:col-span-2 lg:items-start h-full items-center',
                    showSolution ? 'flex' : 'hidden'
                )}
            >
                {/* toolbar */}
                <div className="flex items-center gap-1 sm:flex-row">
                    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant={solutionMode === 'keyboard' ? 'default' : 'outline'}
                                    onClick={() => {
                                        setSolutionMode('keyboard');
                                    }}
                                >
                                    <KeyboardIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('keyboard-solution')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size="icon"
                                    variant={solutionMode === 'mouse' ? 'default' : 'outline'}
                                    onClick={() => {
                                        setSolutionMode('mouse');
                                    }}
                                >
                                    <MouseIcon />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>{t('mouse-solution')}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {hasSolution && !isSolving && solution.length === 0 && (
                    <Card>
                        <CardHeader>
                            <h2>{t('finished')}</h2>
                        </CardHeader>
                    </Card>
                )}

                {!hasSolution && !isSolving && (
                    <Card>
                        <CardHeader>
                            <h2>{t('no-solution')}</h2>
                        </CardHeader>
                    </Card>
                )}

                {/* solution */}
                <div className="text-xl grid-rows-14 grid-cols-3 grid gap-x-2 gap-y-4 grid-flow-col px-8 sm:w-11/12 lg:w-full lg:px-2">
                    {solution.map((step, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 w-28 col-span-1">
                            <span>{index + 1}.</span>
                            <span className={cn(solutionMode === 'keyboard' && 'hidden')}>
                                {step.replace(/U/g, '↑').replace(/D/g, '↓').replace(/L/g, '←').replace(/R/g, '→')}
                            </span>
                            <span className={cn(solutionMode === 'mouse' && 'hidden')}>
                                {step.replace(/U/g, '↓').replace(/D/g, '↑').replace(/L/g, '→').replace(/R/g, '←')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
