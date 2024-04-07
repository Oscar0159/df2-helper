'use client';

import { useState } from 'react';

import { AspectRatio } from '@/components/ui/aspect-ratio';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { MapTable } from './components/map-table';
import type { DrawOption, MapCell, Mission } from './types';

type Props = {
    mapUrl: string;
    mapCellList: MapCell[][];
    missionList: Mission[];
    outposts: string[];
    chunkSize: number;
};

export default function DF2Profiler({ mapUrl, mapCellList, missionList, outposts, chunkSize }: Props) {
    const [data, setData] = useState<(Mission & DrawOption)[]>(
        missionList.map((mission) => ({ ...mission, drawdestination: false, drawgiver: false }))
    );

    return (
        <div className='grid grid-cols-5 gap-4'>
            <div className="col-span-5 flex flex-col gap-2 lg:col-span-3">
                <AspectRatio ratio={5 / 3}>
                    <MapTable mapUrl={mapUrl} mapCellList={mapCellList} outposts={outposts} chunkSize={chunkSize} />
                </AspectRatio>
            </div>

            <div className="col-span-5 flex flex-col gap-2 lg:col-span-2">
                <DataTable columns={columns} data={data} setData={setData} />
            </div>
        </div>
    );
}
