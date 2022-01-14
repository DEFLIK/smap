import { HashIndexer } from "./hashIndexer"
import { DataLoader, DataStorage, FilterEndPointUrls } from "./data"
import { AwardsNamesFilter, KnowldegeAreasFilter, OrganizationNamesFilter, RanksFilter, UsernamesFilter } from "./endPointTypes"
import { FilterMenuController } from "./filterMenuController"
import { MapController } from "./mapController"
import { InfoListController } from "./infoListController"
import { StateController } from "./stateController"

window.onload = async function () {
    console.log(
        "%cWarning: This is a code-review version without any data connected (due to database privacy reasons). If you want to get full experience go to: storymap-urfu.herokuapp.com", 
        "padding: 5px; color: darkred; background-color: #6FB1F6; border-radius: 5px; font-size: 15px",
    );

    let storage = new DataStorage( // to remove Array -> Set -> Array after back fix
        (await DataLoader.requestFilterInfo<OrganizationNamesFilter>(FilterEndPointUrls.organizationNames)).organizations_names,
        (await DataLoader.requestFilterInfo<UsernamesFilter>(FilterEndPointUrls.usernames)).usernames
    )
    let organIndexer = new HashIndexer(storage.organisations);
    let nameIndexer = new HashIndexer(storage.usernames)
    
    let mapController = new MapController();
    ymaps.ready().then(() => {
        mapController.init()
    })

    let loader = new StateController('loader-map', 'loader-active');
    let loaderBackground = new StateController('loader-background', 'loader-background-active')
    let filterMenu = new FilterMenuController(storage, mapController, organIndexer, nameIndexer, [loader, loaderBackground]);

    let awardsResp = (await DataLoader.requestFilterInfo<AwardsNamesFilter>(FilterEndPointUrls.awardNames)).awards_names;
    let knowlResp = (await DataLoader.requestFilterInfo<KnowldegeAreasFilter>(FilterEndPointUrls.knowledgeAreas)).knowledge_areas;
    let ranksResp = (await DataLoader.requestFilterInfo<RanksFilter>(FilterEndPointUrls.ranks)).ranks;

    filterMenu.updateFiltersOptions(ranksResp, awardsResp, knowlResp);

    window['InfoListController'] = InfoListController // for public DOM usage
    $('.info-list').on('scroll', function() { // to dynamic...
        if (this.offsetHeight + this.scrollTop >= this.scrollHeight) {
            InfoListController.requestMoreInfo();
        }
    })

    filterMenu.loadCities(mapController, [loader, loaderBackground]);
}