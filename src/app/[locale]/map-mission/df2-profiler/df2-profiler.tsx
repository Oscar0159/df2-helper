'use client';

import { useState } from 'react';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { MapTable } from './components/map-table';
import type { DrawOption, MapCell, Mission } from './types';

type Props = {
    mapUrl: string;
    mapCells: MapCell[][];
    missions: Mission[];
    outposts: string[];
    raidBuildings: string[];
    chunkSize: number;
};

export default function DF2Profiler({ mapUrl, mapCells, missions, outposts, raidBuildings, chunkSize }: Props) {
    const [data, setData] = useState<(Mission & DrawOption)[]>(
        missions.map((mission) => ({ ...mission, drawDestination: false, drawGiver: false }))
    );

    const drawState = {
        pointColor: data.flatMap((missionAndDrawOption) => {
            const { drawDestination, drawGiver } = missionAndDrawOption;
            const { xcoord, ycoord, giverxcoord, giverycoord } = missionAndDrawOption;

            return [
                ...(drawDestination ? [{ x: xcoord, y: ycoord, color: 'rgba(211, 227, 92, 0.4)' }] : []),
                ...(drawGiver ? [{ x: giverxcoord, y: giverycoord, color: 'rgba(133, 205, 231, 0.4)' }] : []),
            ];
        }),
    };

    return (
        <div className="grid grid-cols-5 gap-4">
            <div className="col-span-5 lg:col-span-3">
                <MapTable
                    mapUrl={mapUrl}
                    mapCellList={mapCells}
                    outposts={outposts}
                    raidBuildings={raidBuildings}
                    chunkSize={chunkSize}
                    drawState={drawState}
                />
            </div>

            <div className="col-span-5 lg:col-span-2">
                <DataTable columns={columns} data={data} setData={setData} />
            </div>
        </div>
    );
}
