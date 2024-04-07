'use client';

import { useState } from 'react';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { MapTable } from './components/map-table';
import type { DrawOption, MapCell, Mission } from './types';

type Props = {
    mapUrl: string;
    mapCellList: MapCell[][];
    missionList: Mission[];
    outposts: string[];
    redBuilding: string[];
    chunkSize: number;
};

export default function DF2Profiler({ mapUrl, mapCellList, missionList, outposts, redBuilding, chunkSize }: Props) {
    const [data, setData] = useState<(Mission & DrawOption)[]>(
        missionList.map((mission) => ({ ...mission, drawdestination: false, drawgiver: false }))
    );

    const drawState = {
        pointColor: data.flatMap((missionAndDrawOption) => {
            const { drawdestination, drawgiver } = missionAndDrawOption;
            const { xcoord, ycoord, giverxcoord, giverycoord } = missionAndDrawOption;

            return [
                ...(drawdestination ? [{ x: xcoord, y: ycoord, color: 'rgba(211, 227, 92, 0.4)' }] : []),
                ...(drawgiver ? [{ x: giverxcoord, y: giverycoord, color: 'rgba(133, 205, 231, 0.4)' }] : []),
            ];
        }),
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5 flex flex-col gap-2 lg:col-span-3">
                <MapTable
                    mapUrl={mapUrl}
                    mapCellList={mapCellList}
                    outposts={outposts}
                    redBuilding={redBuilding}
                    chunkSize={chunkSize}
                    drawState={drawState}
                />
            </div>

            <div className="col-span-5 flex flex-col gap-2 lg:col-span-2">
                <DataTable columns={columns} data={data} setData={setData} />
            </div>
        </div>
    );
}
