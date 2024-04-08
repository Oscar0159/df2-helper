'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Sliding() {
    const t = useTranslations('SlidingPage');

    return (
        <div className="grid grid-cols-5 gap-4 h-full">
            <div className="col-span-5 flex flex-col gap-2 lg:col-span-3 bg-red-500"></div>

            <div className="col-span-5 flex flex-col gap-2 lg:col-span-2 bg-blue-500"></div>
        </div>
    );
}
