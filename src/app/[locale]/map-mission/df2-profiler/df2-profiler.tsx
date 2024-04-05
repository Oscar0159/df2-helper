'use client';

import { useState, useCallback, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { type MapData, type MissionData } from '@/lib/df2profiler';
import { useRouter, usePathname } from '@/navigation';

type Props = {
    mapUrl: string;
    mapDataList: MapData[][];
    missionDataList: MissionData[];
    outposts: string[];
    chunkSize?: number;
};

export default function DF2Profiler({ mapUrl, mapDataList, missionDataList, outposts, chunkSize }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    return (
        <div className="grid grow grid-cols-5 gap-4">
            <div className="col-span-5 flex grow flex-col gap-2 lg:col-span-3">
                <AspectRatio ratio={5 / 3}>
                    <table
                        style={{ backgroundImage: `url(${mapUrl})` }}
                        className="h-full w-full rounded-md bg-contain bg-no-repeat"
                    >
                        <tbody>
                            {mapDataList.map((row, y) => (
                                <tr key={y}>
                                    {row.map((data, x) => (
                                        <TooltipProvider
                                            key={x}
                                            delayDuration={0}
                                            skipDelayDuration={0}
                                            disableHoverableContent
                                        >
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger asChild>
                                                    <td
                                                        className={cn(
                                                            'group relative border-collapse border border-white/10 hover:bg-white/30',
                                                            x === 0 && y === 0 && 'rounded-tl-md',
                                                            x === row.length - 1 && y === 0 && 'rounded-tr-md',
                                                            x === 0 && y === mapDataList.length - 1 && 'rounded-bl-md',
                                                            x === row.length - 1 &&
                                                                y === mapDataList.length - 1 &&
                                                                'rounded-br-md',
                                                            x % chunkSize === 0
                                                                ? x === 0
                                                                    ? 'border-l-0 pl-[1.3px]'
                                                                    : 'border-l border-l-white/50'
                                                                : '',
                                                            x % chunkSize === chunkSize - 1
                                                                ? x === row.length - 1
                                                                    ? 'border-r-0 pr-[1.3px]'
                                                                    : 'border-r border-r-white/50'
                                                                : '',
                                                            y % chunkSize === 0
                                                                ? y === 0
                                                                    ? 'border-t-0 pt-[1.3px]'
                                                                    : 'border-t border-t-white/50'
                                                                : '',
                                                            y % chunkSize === chunkSize - 1
                                                                ? y === mapDataList.length - 1
                                                                    ? 'border-b-0 pb-[1.3px]'
                                                                    : 'border-b border-b-white/50'
                                                                : '',
                                                            data.isOutpost && 'bg-green-500/40 hover:bg-green-500/70',
                                                            data.isPvP && 'bg-red-500/40 hover:bg-red-500/70'
                                                        )}
                                                    >
                                                        <TooltipContent
                                                            sideOffset={10}
                                                            side="bottom"
                                                            className="block bg-background/80"
                                                        >
                                                            <p className="text-base font-semibold">
                                                                {data.district} (Lv.{data.level})
                                                            </p>
                                                            <div className="mt-1 flex flex-col gap-0.5">
                                                                {data.buildings.map((building, i) => (
                                                                    <p
                                                                        key={i}
                                                                        className={
                                                                            outposts.includes(building)
                                                                                ? 'text-green-700 dark:text-green-500'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        {building}
                                                                    </p>
                                                                ))}
                                                            </div>
                                                        </TooltipContent>
                                                    </td>
                                                </TooltipTrigger>
                                            </Tooltip>
                                        </TooltipProvider>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AspectRatio>
            </div>

            <div className="col-span-5 flex grow flex-col gap-2 lg:col-span-2">
                {/* <button
                    onClick={() => {
                        // <pathname>?sort=asc
                        router.push(pathname + '?' + createQueryString('sort', 'asc'));
                    }}
                >
                    ASC
                </button> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody></TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} className="text-right">
                                Total
                            </TableCell>
                            <TableCell className="text-right">€ 0.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
}
