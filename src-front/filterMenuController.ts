import { HashIndexer } from "./hashIndexer";
import { DataLoader, DataStorage, FilterRequestSettings } from "./data";
import { HintsController } from "./hintsController";
import { MapController } from "./mapController";
import { StateController } from "./stateController";
import { InfoListController } from "./infoListController";
import { CityInfo } from "./endPointTypes";

// To refactor
export class FilterMenuController {
    private static get username(): string {
        let res = $('.filter-input-name').val() as string;

        return res ? res : 'all';
    }
    private static get years(): string[] {
        let start = $('#start_year').val() as string;
        let end = $('#end_year').val() as string;

        return [start ? start : 'all', end ? end : 'all']
    }
    private static get knowledge(): string[] {
        return this.getCheckedValues('filter-knowledge');
    }
    private static get award(): string[] {
        return this.getCheckedValues('filter-award');
    }
    private static get rank(): string[] {
        return this.getCheckedValues('filter-rank');
    }
    private static get organisations(): string {
        let res = $('.filter-input-org').val() as string;

        return res ? res : 'all';
    }

    constructor (
        storage: DataStorage, 
        mapController: MapController, 
        organisationIndexer: HashIndexer, 
        usernamesIndexer: HashIndexer,
        loaders: StateController[]) 
    { 
        $('.info-btn').on('click', function (e) {
            $('.tab-right').toggleClass('tab-right-active');
            $('.info-btn').toggleClass('info-btn-active');
        });
        
        $('.filter-btn').on('click', function (e) {
            $(this).toggleClass('filter-btn-active');
            $('.filter').toggleClass('filter-active');
            $('.filter-btn-icon').toggleClass('filter-btn-icon-active');
        });
        
        $('.filter-option').hover(function(e) {
            if($(this).children('.filter-expander').hasClass('filter-expander-active')) {
                return;
            }
            $(this).children('.filter-expander').toggleClass('filter-expander-open');
        });
        
        $('.filter-option').on('click', function(e) {
            if ($(this).hasClass('filter-option-open')) {
                $('.filter-expander').removeClass('filter-expander-active');
                $('.filter-expander .filter-settings').removeClass('filter-settings-open');
                $('.filter-expander .filter-settings .filter-settings-shadow').removeClass('filter-settings-shadow-active');
                $('.filter-option').removeClass('filter-option-open');
                return;
            }
        
            $('.filter-expander').removeClass('filter-expander-active');
            $('.filter-expander').removeClass('filter-expander-open');
            $('.filter-expander .filter-settings').removeClass('filter-settings-open');
            $('.filter-expander .filter-settings .filter-settings-shadow').removeClass('filter-settings-shadow-active');
            $('.filter-option').removeClass('filter-option-open');
        
            $(this).children('.filter-expander').toggleClass('filter-expander-active');
            $(this).children('.filter-expander').toggleClass('filter-expander-open');
            $(this).children('.filter-expander').children('.filter-settings').toggleClass('filter-settings-open');
            $(this).children('.filter-expander').children('.filter-settings').children('.filter-settings-shadow').toggleClass('filter-settings-shadow-active');
            $(this).toggleClass('filter-option-open');
        });
        
        $('.filter-settings').on('click', function(e) {
            e.stopPropagation();
        });
        
        $('.filter-apply').on('click', () => {
            $('.filter').removeClass('filter-active');
            $('.filter-btn').removeClass('filter-btn-active');
            $('.filter-btn-icon').removeClass('filter-btn-icon-active');
            InfoListController.hidePanel();
            this.loadCities(mapController, loaders).then(() => {
                InfoListController.setCityTitle('Выберите город');
                InfoListController.clearInfoList();
                InfoListController.addHint('Нажмите на метку города, чтобы посмотреть его информацию');
            }, () => {
                InfoListController.setCityTitle('Нет результатов :(');
                InfoListController.clearInfoList();
                InfoListController.addHint('Ничего не найдено. Попробуйте задать другие фильтры');
            }).finally(() => {
                InfoListController.showPanel();
            });
        });
        
        $('.filter-input-org').on('input', function() {
            $('.filter-input-hint-org-inner').empty();
            let resultIds = HintsController.getHints((this as HTMLInputElement).value.split(' ').filter(x => !!x), organisationIndexer, 5);
            for (let i = 0; i < resultIds.length && i < 5; i++) {
                $('.filter-input-hint-org-inner').append(
                    $('<span>').append(resultIds[i]).on('click', function() {
                        $('.filter-input-org').val(`${resultIds[i]}`);
                    })
                );
            }
        });
        
        $('.filter-input-name').on('input', function() {
            $('.filter-input-hint-name-inner').empty();
            let resultWords = HintsController.getHints((this as HTMLInputElement).value.split(' ').filter(x => !!x), usernamesIndexer, 5);
            for (let i = 0; i < resultWords.length && i < 5; i++) {
                $('.filter-input-hint-name-inner').append(
                    $('<span>').append(resultWords[i]).on('click', function() {
                        $('.filter-input-name').val(`${resultWords[i]}`);
                    })
                );
            }
        });
    }

    public static getFilters(cityName: string): FilterRequestSettings {
        let years = this.years;
        return new FilterRequestSettings(
            years[0],
            years[1],
            this.knowledge,
            this.organisations,
            this.rank,
            this.award,
            this.username,
            cityName
        )
    }

    public async loadCities(mapController: MapController, loaders: StateController[]): Promise<void> {
        loaders.forEach(e => {e.activate()});
        return DataLoader
            .requestCities(
                new FilterRequestSettings(
                    FilterMenuController.years[0], 
                    FilterMenuController.years[1], 
                    FilterMenuController.knowledge, 
                    FilterMenuController.organisations, 
                    FilterMenuController.rank, 
                    FilterMenuController.award, 
                    FilterMenuController.username)
            ).then(cities => {
                mapController.removeMarkers();
                mapController.addMarkers(cities);
            }, (e) => {
                mapController.removeMarkers();
                throw e;
            }).finally(() => {
                loaders.forEach(e => {e.disable()});
            })
    }

    public updateFiltersOptions(ranks: string[], awards: string[], knowledgeAreas: string[]) {
        this.updateFilterOption('filter-rank', ranks);
        this.updateFilterOption('filter-award', awards);
        this.updateFilterOption('filter-knowledge', knowledgeAreas);
    }

    private updateFilterOption(listClassName: string, data: string[]) {
        for (let setting of data) {
            $(`.${listClassName}`)
                .append($(`<input type="checkbox" id="${setting}" value="${setting}">`))
                .append($('<div class="filter-settings-option">')
                    .append($(`<label for="${setting}">`)
                        .append(setting)
                    )
                );
        }
    }

    private static getCheckedValues(groupName: string) {
        let res = new Array<string>();
        $(`.${groupName} input[type="checkbox"]:checked`).each(function(){
            res.push($(this).val() as string);
        });

        return res.length === 0 ? ['all'] : res;
    }
}

