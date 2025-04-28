import Image from 'next/image';

import { MapChunk } from '../schema/map-chunk';
import MapChunks from './map-chunks';

export default async function MapViewer({ mapUrl, mapChunks }: { mapUrl: string; mapChunks: MapChunk[] }) {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="relative aspect-[1089/644] w-full overflow-hidden rounded-sm md:rounded-lg">
        <Image src={mapUrl} fill alt="map" className="-z-1" />
        <MapChunks mapChunks={mapChunks} />
      </div>
    </div>
  );
}
