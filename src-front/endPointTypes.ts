interface CityInfo {
    id_adress: number,
    city: string,
    latitude: number,
    longitude: number,
    count: number
}

interface CityPersonInfo {
    id_award_receiving: number,
    person_full_name: string,
    award_year: number,
    award_name: string,
    area: string
}

interface PersonInfo {
    organization: string,
    rank: string,
    achievement: string,
    team: PersonName[]
}

interface PersonName {
    person: string
}

interface UsernamesFilter {
    usernames: string[]
}

interface RanksFilter {
    ranks: string[]
}

interface KnowldegeAreasFilter {
    knowledge_areas: string[]
}

interface AwardsNamesFilter {
    awards_names: string[]
}

interface OrganizationNamesFilter {
    organizations_names: string[]
}

type Filters = RanksFilter | KnowldegeAreasFilter | AwardsNamesFilter | OrganizationNamesFilter | UsernamesFilter

export { 
    CityInfo, 
    PersonInfo, 
    CityPersonInfo, 
    RanksFilter, 
    KnowldegeAreasFilter,
    AwardsNamesFilter,
    OrganizationNamesFilter,
    UsernamesFilter,
    Filters
}