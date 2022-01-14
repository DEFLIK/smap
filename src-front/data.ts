// import fetch from 'node-fetch';
import { CityInfo, CityPersonInfo, Filters, PersonInfo } from './endPointTypes';

export class FilterRequestSettings {
    public constructor(
        public readonly syear: string  = 'all', 
        public readonly eyear: string  = 'all',
        public readonly area: string[] = ['all'],
        public readonly org: string = 'all',
        public readonly rank: string[] = ['all'],
        public readonly award: string[] = ['all'],
        public readonly username: string = 'all',
        public readonly cityName: string = 'all') {}
    
    public getSettingsPatch(): string {
        return `city=${this.cityName}&s_year=${this.syear}&e_year=${this.eyear}&area=${this.area.join(',')}&org=${this.org}&rank=${this.rank.join(',')}&award=${this.award.join(',')}&username=${this.username}`
    }
 }

export class DataLoader {
    static async requestFilterInfo<T extends Filters>(url: FilterEndPointUrls): Promise<T> {
        return await(await fetch(url)).json() as T
    }

    static async requestCities(settings: FilterRequestSettings): Promise<CityInfo[]> {
        let res = await fetch(`/smap-api/v1.0/getNumberOfPeopleInCities?${settings.getSettingsPatch()}`);
        if (res.ok) {
            return await res.json() as CityInfo[];
        }

        throw new Error(`Wrong request, or got nothing to return: ${res.statusText}`);
    }

    static async requestCityPersons(settings: FilterRequestSettings): Promise<CityPersonInfo[]> {
        return await (
            await fetch(`/smap-api/v1.0/getPeople?${settings.getSettingsPatch()}`)
        ).json() as CityPersonInfo[]
    }

    static async requestCityPersonsChunk(settings: FilterRequestSettings, startIndex: number): Promise<CityPersonInfo[]> {
        return await (
            await fetch(`/smap-api/v1.0/getPieceOfPeople?${settings.getSettingsPatch()}&start_index=${startIndex}`)
        ).json() as CityPersonInfo[]
    }

    static async requestPerson(id: number) {
        return await (await fetch(`/smap-api/v1.0/getMoreInfoAboutPerson?id_award_receiving=${id}`)).json() as PersonInfo
    }
}

export class DataStorage { // remove
    public get organisations() {
        return this._organisations;
    }
    public get usernames() {
        return this._usernames;
    }

    public constructor(
        private _organisations = new Array<string>(),
        private _usernames = new Array<string>()
    ) {}
}

export enum FilterEndPointUrls {
    ranks = '/smap-api/v1.0/getRanksForFilter',
    knowledgeAreas = '/smap-api/v1.0/getKnowledgeAreasForFilter',
    awardNames = '/smap-api/v1.0/getAwardsNamesForFilter',
    organizationNames = '/smap-api/v1.0/getOrganizationsNamesForFilter',
    usernames = '/smap-api/v1.0/getUsernamesForFilter',
}
