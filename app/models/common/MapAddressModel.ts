export default class MapAddressModel {
    placeId: string;
    lat?: number;
    lng?: number;
    address: string;
    zoom?: number;
    streetNumber?: string;
    streetName?: string;
    state: string;
    country: string;
    countryShort: string;

    constructor() {
        this.placeId = '';
        this.address = '';
        this.state = '';
        this.country = '';
        this.countryShort = '';
    }

    static parseFromJson = (data: any): MapAddressModel => {
        const obj = new MapAddressModel();
        const {address, lat, lng, place_id, zoom, street_number, street_name, state, country, country_short} = data;
        obj.placeId = place_id;
        obj.address = address;
        obj.lat = lat;
        obj.lng = lng;
        obj.zoom = zoom;
        obj.streetNumber = street_number;
        obj.streetName = street_name;
        obj.state = state;
        obj.country = country;
        obj.countryShort = country_short;
        return obj;
    };
}
