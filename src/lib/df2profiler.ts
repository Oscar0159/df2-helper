import { JSDOM } from 'jsdom';

export const baseUrl = 'https://df2profiler.com';

export const outposts = ['Dallbow Police Department', 'Haverbrook Memorial Hospital', 'Greywood Star Hotel'];

export function parse(html: string): { mapUrl: string; mapDataList: any[][]; missionDataList: any[] } {
    const dom = new JSDOM(html);
    const window = dom.window;
    const document = window.document;

    const mapTable = document.querySelector('#map');
    if (!mapTable) {
        return { mapUrl: '', mapDataList: [], missionDataList: [] };
    }
    const mapTableComputedStyle = window.getComputedStyle(mapTable);
    const mapUrl = baseUrl + mapTableComputedStyle.backgroundImage.slice(4, -1).replace(/"/g, '');

    const mapTdList = mapTable.querySelectorAll('td');
    const mapDataList: {
        level: number;
        buildings: string[];
        xcoord: number;
        ycoord: number;
        isOutpost: boolean;
        isPvP: boolean;
        district: string;
        types: string[];
    }[][] = [];
    mapTdList.forEach((td) => {
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

    const missionSpanList = document.querySelectorAll(
        '.center > div:not(.searchOptions):not(#searchBox):not(#sortedValue) > span'
    );
    const missionDataList: {
        minlvl: number;
        maxlvl: number;
        xcoord: number;
        ycoord: number;
        giverxcoord: number;
        giverycoord: number;
        building: string;
        giverbuilding: string;
        type: string;
        requirement: string;
    }[] = Array.from(missionSpanList).map((missionSpan) => {
        const missionTypeSpan = missionSpan.querySelector('strong');
        const giverSpan = missionSpan.querySelector('span.giverLookup');

        const minlvl = parseInt(missionSpan.getAttribute('data-minlvl') || '');
        const maxlvl = parseInt(missionSpan.getAttribute('data-maxlvl') || '');
        const xcoord = parseInt(missionSpan.getAttribute('data-xcoord') || '');
        const ycoord = parseInt(missionSpan.getAttribute('data-ycoord') || '');
        const giverxcoord = parseInt(giverSpan?.getAttribute('data-xcoord') || '');
        const giverycoord = parseInt(giverSpan?.getAttribute('data-ycoord') || '');
        const building = missionSpan.getAttribute('data-building') || '';
        const giverbuilding = giverSpan?.getAttribute('data-building') || '';
        const type = missionTypeSpan?.textContent || '';
        const missionText = missionSpan.textContent || '';
        const requirement =
            new RegExp(
                `.*wants you to:?\s?${type === 'Find Item' ? 'Find the following item\\(s\\):' : ''}(.*)${building ? 'Building:(.*)' : ''}`,
                'gm'
            )
                .exec(missionText)?.[1]
                .split(',')[0]
                .trim() || '';

        return { minlvl, maxlvl, xcoord, ycoord, giverxcoord, giverycoord, building, giverbuilding, type, requirement };
    });

    return { mapUrl, mapDataList, missionDataList };
}
