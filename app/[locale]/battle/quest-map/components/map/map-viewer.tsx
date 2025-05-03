import Image from 'next/image';

import { MapChunk } from '../../schema/map-chunk';
import { BuildingFilter, ClearFilter, TypeFilter } from './filters';
import MapChunks from './map-chunks';

export default async function MapViewer({
  mapUrl,
  mapChunks,
}: {
  mapUrl: string;
  mapChunks: MapChunk[];
}) {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative aspect-[1089/644] w-full rounded-sm md:rounded-lg">
        {/* TODO: Complete filters */}
        <div className="absolute flex w-full -translate-y-[150%] items-center justify-start gap-2">
          <ClearFilter />
          <TypeFilter />
          <BuildingFilter className="w-full" />
        </div>
        <Image
          src={mapUrl}
          fill
          alt="map"
          className="-z-1 rounded-sm"
          priority
          sizes="1089px"
        />
        <MapChunks mapChunks={mapChunks} />
      </div>
    </div>
  );
}
