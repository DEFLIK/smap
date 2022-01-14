import { DataLoader } from "./data";
import { CityPersonInfo, PersonInfo } from "./endPointTypes";
import { FilterMenuController } from "./filterMenuController";

// To refactor & dynamic
export class InfoListController {
    private static _onRequestState = false;
    private static _loadedCount = 0;
    private static _chunkSize = 100;
    private static _maxSize: number;
    private static _bindedCity: string;

    public static async bindCityInfo(cityName: string, maxSize: number) {
        if (cityName === this._bindedCity) return;
        
        this.clearInfoList();
        this.showPanel();
        this._bindedCity = cityName;
        this._maxSize = maxSize;

        await this.requestMoreInfo();
    }

    public static async appendInfoList(personsInCity: CityPersonInfo[], city: string) {
        this.setCityTitle(city);
        for (let person of personsInCity) {
            $('.info-list').append(
                $('<div>').attr({class: 'info-element', id: person.id_award_receiving}).append(
                    [
                        $('<ul>').attr('class', 'info-element-table').append(
                            [
                                $('<li>').append(`<b>ФИО</b>: ${person.person_full_name}`),
                                $('<br>'),
                                $('<li>').append(`<b>Премия</b>: ${person.award_name}`),
                                $('<li>').append(`<b>Область знания</b>: ${person.area}`),
                                $('<li>').append(`<b>Год</b>: ${person.award_year}`)
                            ]
                        ),
                        $('<img>').attr({
                            src: '/static/resources/hide.svg',
                            class: 'info-hide-icon',
                            alt: 'hide'
                        }).on('click', function (event) {
                            if (event.target.classList.contains('info-hide-icon-active')) {
                                InfoListController.minimizeInfoElement(person.id_award_receiving)
                            } else {
                                DataLoader.requestPerson(person.id_award_receiving).then(personInfo => {
                                    InfoListController.appendPersonInfo(person.id_award_receiving, personInfo);
                                })
                            }
                        })
                    ]
                )
            );
        }
    }

    public static addHint(text: string) {
        $('.info-list').append(
            [
                $('<br>'),
                $('<div>').attr({class: 'info-element'}).append(
                    $('<ul>').attr('class', 'info-element-table').append(
                        $('<li>').append(
                            $('<b>').append(
                                text
                            )
                        )
                    )
                )
            ]
        )
    }

    public static setCityTitle(s: string) {
        $('.info-town').html(s);
    }

    public static clearInfoList() {
        $('.info-list').empty();
        this._loadedCount = 0;
        this._bindedCity = '';
    }

    public static hidePanel() {
        $('.tab-right').removeClass('tab-right-active');
        $('.info-btn').removeClass('info-btn-active');
    }

    public static showPanel() {
        $('.tab-right').addClass('tab-right-active');
        $('.info-btn').addClass('info-btn-active');
    }

    public static setInfoLoader() {
        $('.info-list').append(
            $('<div>').attr('class', 'loader loader-info loader-active').append(
                $('<div>').attr('class', 'loader-els').append(
                    [
                        $('<span>').attr('class', 'loader-el'),
                        $('<span>').attr('class', 'loader-el'),
                        $('<span>').attr('class', 'loader-el'),
                        $('<span>').attr('class', 'loader-el'),
                    ]
                )
            )
        )
    }

    public static removeInfoLoader() {
        $('.info-list .loader-info').remove();
    }

    public static appendPersonInfo(id: number, personInfo: PersonInfo) {
        $(`#${id} .info-element-table`).append(
            [
                $('<li>').attr({class: 'info-additional'}).append(`<b>Организация</b>: ${personInfo.organization}`),
                $('<li>').attr({class: 'info-additional'}).append(`<b>Степень премии</b>: ${personInfo.rank}`),
                $('<li>').attr({class: 'info-additional'}).append(`<b>Достижение</b>: ${personInfo.achievement}`),
                $('<li>').attr({class: 'info-additional'}).append(`<b>Коллектив</b>: ${personInfo.team.map(x => x.person).join(', ')}`)
            ]
        );
        $(`#${id} .info-hide-icon`).addClass('info-hide-icon-active');
    }

    public static minimizeInfoElement(id: number) {
        $(`#${id} .info-element-table .info-additional`).remove()
        $(`#${id} .info-hide-icon`).removeClass('info-hide-icon-active');
    }

    public static async requestMoreInfo() {
        if (this._loadedCount >= this._maxSize || this._onRequestState) return;
        this._onRequestState = true;

        this.setInfoLoader();
        let data = await DataLoader.requestCityPersonsChunk(FilterMenuController.getFilters(this._bindedCity), this._loadedCount);
        await this.appendInfoList(data, this._bindedCity);
        this._loadedCount += this._chunkSize;

        this.removeInfoLoader();
        this._onRequestState = false;
    }

    // public static addSettingsToList(listClassName: string, data: Filters) {
    //     for (let setting of data) {
    //         $(`.${listClassName}`).append(
    //             $('<li>').append(
    //                 $('<a>').append(setting).on('click', function () {
    //                     $(`.${InfoListController._binder[listClassName]}`).html(this.innerHTML);
    //                 })
    //             )
    //         );
    //     }
    // }
}