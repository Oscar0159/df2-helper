import { JSDOM } from 'jsdom'

export const baseUrl = 'https://df2profiler.com';

export type MapData = {
    level: number;
    buildings: string[];
    xcoord: number;
    ycoord: number;
    isOutpost: boolean;
    isPvP: boolean;
    district: string;
    types: string[];
}

export type MissionData = {
    minlvl: number;
    maxlvl: number;
    hascoord: boolean;
    xcoord: number;
    ycoord: number;
    district: string;
    giverdistrict: string;
    objectivedistrict: string;
    forever: boolean;
    building: string;
}

export const outposts = [
    "Dallbow Police Department",
    "Haverbrook Memorial Hospital",
    "Greywood Star Hotel"
]

export function parse(html: string) {
    const dom = new JSDOM(html);
    const window = dom.window;
    const document = window.document;

    const mapTable = document.querySelector('#map');
    if (!mapTable) {
        return { mapUrl: '', mapDataList: [], missionDataList: [] };
    }
    const mapTableComputedStyle = window.getComputedStyle(mapTable);
    const mapUrl = baseUrl + mapTableComputedStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

    const mapTdList = mapTable.querySelectorAll('td');
    const mapDataList: MapData[][] = [];
    mapTdList.forEach(td => {
        const level = parseInt(td.getAttribute('data-level') || '');
        const buildings = (td.getAttribute('data-buildings') || '').split(',');
        const xcoord = parseInt(td.getAttribute('data-xcoord') || '');
        const ycoord = parseInt(td.getAttribute('data-ycoord') || '');
        const isOutpost = td.classList.contains('outpost');
        const isPvP = td.classList.contains('pvpZone');
        const district = td.getAttribute('data-district') || '';
        const types = (td.getAttribute('data-types') || '').split(',');

        if (!xcoord || !ycoord) return;

        if (!mapDataList[ycoord - 1]) {
            mapDataList[ycoord - 1] = [];
        }
        mapDataList[ycoord - 1][xcoord - 1] = { level, buildings, xcoord, ycoord, isOutpost, isPvP, district, types };
    });

    const missionSpanList = document.querySelectorAll('.center > div:not(.searchOptions):not(#searchBox):not(#sortedValue) > span');

    const missionDataList: MissionData[] = Array.from(missionSpanList).map(span => {
        const minlvl = parseInt(span.getAttribute('data-minlvl') || '');
        const maxlvl = parseInt(span.getAttribute('data-maxlvl') || '');
        const hascoord = span.getAttribute('data-hascoord') === 'true';
        const xcoord = parseInt(span.getAttribute('data-xcoord') || '');
        const ycoord = parseInt(span.getAttribute('data-ycoord') || '');
        const district = span.getAttribute('data-district') || '';
        const giverdistrict = span.getAttribute('data-giverdistrict') || '';
        const objectivedistrict = span.getAttribute('data-objectivedistrict') || '';
        const forever = span.getAttribute('data-forever') === 'true';
        const building = span.getAttribute('data-building') || '';

        return { minlvl, maxlvl, hascoord, xcoord, ycoord, district, giverdistrict, objectivedistrict, forever, building };
    });

    return { mapUrl, mapDataList, missionDataList };
}