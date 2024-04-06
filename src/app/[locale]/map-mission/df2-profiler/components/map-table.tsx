import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

import mapBackground from '../../../../../../public/images/map_background.png';
import type { MapCell } from '../types';

type Props = {
    mapUrl: string;
    mapCellList: MapCell[][];
    outposts: string[];
    chunkSize: number;
};

export function MapTable({ mapUrl, mapCellList, outposts, chunkSize }: Props) {
    return (
        <table
            style={{ backgroundImage: `url(${mapUrl || mapBackground.src})` }}
            className="h-full w-full rounded-md bg-contain bg-no-repeat"
        >
            <tbody>
                {mapCellList.map((row, y) => (
                    <tr key={y}>
                        {row.map((data, x) => (
                            <TooltipProvider key={x} delayDuration={0} skipDelayDuration={0} disableHoverableContent>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <td
                                            className={cn(
                                                'group relative border-collapse border border-white/10 hover:bg-white/30',
                                                x === 0 && y === 0 && 'rounded-tl-md',
                                                x === row.length - 1 && y === 0 && 'rounded-tr-md',
                                                x === 0 && y === mapCellList.length - 1 && 'rounded-bl-md',
                                                x === row.length - 1 && y === mapCellList.length - 1 && 'rounded-br-md',
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
                                                    ? y === mapCellList.length - 1
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
    );
}
