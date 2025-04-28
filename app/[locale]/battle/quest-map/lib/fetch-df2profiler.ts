import { JSDOM } from 'jsdom';
import 'server-only';

import { clearCache, getFromCache, setToCache } from '@/lib/memory-cache';
import { safeParseInt } from '@/lib/utils';

import { MapChunk, MapChunkSchema } from '../schema/map-chunk';
import { Mission, MissionSchema } from '../schema/mission';
import {
  BASE_URL,
  FETCH_REVALIDATE,
  FIND_ITEM_REGEX,
  GAME_MAP_URL,
  MEMORY_CACHE_TTL,
  OUTPOSTS,
  RAID_BUILDINGS,
  SPECIAL_BUILDINGS,
  WANTS_YOU_TO_REGEX,
} from './constant';

const sharedJSDOM = new JSDOM();
const sharedDocument = sharedJSDOM.window.document;
const textarea = sharedDocument.createElement('textarea');
function decodeHtml(html: string): string {
  textarea.innerHTML = html;
  return textarea.value;
}

async function fetchHTML(): Promise<Document> {
  const cached = getFromCache<Document>('df2profiler-document', MEMORY_CACHE_TTL);
  if (cached) return cached;

  const response = await fetch(GAME_MAP_URL, { next: { revalidate: FETCH_REVALIDATE } });
  if (!response.ok) {
    console.error(`Failed to fetch game map: ${response.status}`);
    throw new Error(`Failed to fetch game map: ${response.status}`);
  }

  const html = await response.text();
  const { window } = new JSDOM(html);
  clearCache('df2profiler-document');
  setToCache('df2profiler-document', window.document);

  return window.document;
}

export async function fetchMapUrl(): Promise<string> {
  const cached = getFromCache<string>('df2profiler-map-url', MEMORY_CACHE_TTL);
  if (cached) return cached;

  const document = await fetchHTML();

  const mapTable = document.querySelector('table#map');
  if (!mapTable) {
    console.error('fetchMapUrl: Could not find map table');
    throw new Error('fetchMapUrl: Could not find map table');
  }

  const style = mapTable.ownerDocument.defaultView?.getComputedStyle(mapTable);
  const backgroundImage = style?.backgroundImage ?? '';
  const mapUrl = BASE_URL + backgroundImage.slice(4, -1).replace(/"/g, '');

  clearCache('df2profiler-map-url');
  setToCache('df2profiler-map-url', mapUrl);

  return mapUrl;
}

export async function fetchMapChunksData(): Promise<MapChunk[]> {
  const cached = getFromCache<MapChunk[]>('df2profiler-map-chunks', MEMORY_CACHE_TTL);
  if (cached) return cached;

  const document = await fetchHTML();
  const mapTable = document.querySelector('table#map');
  if (!mapTable) {
    console.error('fetchMapChunkData: Map table not found');
    throw new Error('fetchMapChunkData: Map table not found');
  }

  const mapChunks = Array.from(mapTable.querySelectorAll('td')).map((td) => {
    const level = safeParseInt(td.getAttribute('data-level'));
    const buildings = (td.getAttribute('data-buildings') || '').split(',').filter(Boolean);
    const x = safeParseInt(td.getAttribute('data-xcoord'));
    const y = safeParseInt(td.getAttribute('data-ycoord'));
    const hasOutpost = buildings.some((building) => OUTPOSTS.has(building));
    const isPvPZone = td.classList.contains('pvpZone');
    const hasRaidBuilding = buildings.some((building) => RAID_BUILDINGS.has(building));
    const hasSpecialBuilding = buildings.some((building) => SPECIAL_BUILDINGS.has(building));
    const district = td.getAttribute('data-district') || '';
    const buildingTypes = (td.getAttribute('data-types') || '').split(',').filter(Boolean);

    return MapChunkSchema.parse({
      level,
      buildings,
      coord: { x, y },
      hasOutpost,
      isPvPZone,
      hasRaidBuilding,
      hasSpecialBuilding,
      district,
      buildingTypes,
    });
  });

  setToCache('df2profiler-map-chunks', mapChunks);
  return mapChunks;
}

export async function fetchMissionsData(): Promise<Mission[]> {
  const cached = getFromCache<Mission[]>('df2profiler-missions', MEMORY_CACHE_TTL);
  if (cached) return cached;

  const document = await fetchHTML();
  const missionSpans = document.querySelectorAll(
    '.center > div:not(.searchOptions):not(#searchBox):not(#sortedValue) > span',
  );

  const missions: Mission[] = Array.from(missionSpans).map((missionSpan) => {
    const missionTypeSpan = missionSpan.querySelector('strong');
    const giverSpan = missionSpan.querySelector('span.giverLookup');
    const requiredText = missionSpan.textContent || '';

    const minLevel = safeParseInt(missionSpan.getAttribute('data-minlvl'));
    const maxLevel = safeParseInt(missionSpan.getAttribute('data-maxlvl'));
    const distX = safeParseInt(missionSpan.getAttribute('data-xcoord'));
    const distY = safeParseInt(missionSpan.getAttribute('data-ycoord'));
    const giverX = giverSpan ? safeParseInt(missionSpan.getAttribute('data-giverx')) : null;
    const giverY = giverSpan ? safeParseInt(missionSpan.getAttribute('data-givery')) : null;
    const distBuilding = decodeHtml(missionSpan.getAttribute('data-building') || '');
    const giverBuilding = giverSpan ? decodeHtml(giverSpan.getAttribute('data-building') || '') : null;
    const distDistrict = decodeHtml(missionSpan.getAttribute('data-district') || '');
    const giverDistrict = giverSpan ? decodeHtml(giverSpan.getAttribute('data-district') || '') : null;
    const type = missionTypeSpan?.textContent || '';

    let requirement = '';
    if (type === 'Find Item') {
      requirement = FIND_ITEM_REGEX.exec(requiredText)?.[1]?.split(',')[0]?.trim() ?? '';
    } else {
      requirement = WANTS_YOU_TO_REGEX.exec(requiredText)?.[1]?.replace(' at ', ', ').split(',')[0]?.trim() ?? '';
    }

    return MissionSchema.parse({
      minLevel,
      maxLevel,
      distCoord: distX !== null && distY !== null ? { x: distX, y: distY } : null,
      giverCoord: giverX !== null && giverY !== null ? { x: giverX, y: giverY } : null,
      distBuilding,
      giverBuilding,
      distDistrict,
      giverDistrict,
      type,
      isForever: false,
      isDaily: false,
      requirement,
    });
  });

  setToCache('df2profiler-missions', missions);
  return missions;
}
