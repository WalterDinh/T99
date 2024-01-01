export interface MapScreen {
    header?: string;
    dataArr?: DataArr[];
    id?: string;
}

export interface DataArr {
    title?: string;
    subtitle?: string;
    id?: number;
    latitude?: number;
    longitude?: number;
}

export default class MapScreenModel {
    header?: string;
    dataArr?: Array<DataArr>;
    id?: string;

    constructor(mapData: MapScreen) {
        this.header = mapData.header || '';
        this.dataArr = mapData.dataArr || [];
        this.id = mapData.id || '';
    }

    static parseFromJson = (data: Array<MapScreen>): Array<MapScreenModel> => {
        if (data && data.length > 0) {
            return data.map((e: MapScreen) => {
                return new MapScreenModel(e);
            });
        }
        return [];
    };
}
