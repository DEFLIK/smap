var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./data", "./filterMenuController"], function (require, exports, data_1, filterMenuController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InfoListController = void 0;
    // To refactor & dynamic
    var InfoListController = /** @class */ (function () {
        function InfoListController() {
        }
        InfoListController.bindCityInfo = function (cityName, maxSize) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (cityName === this._bindedCity)
                                return [2 /*return*/];
                            this.clearInfoList();
                            this.showPanel();
                            this._bindedCity = cityName;
                            this._maxSize = maxSize;
                            return [4 /*yield*/, this.requestMoreInfo()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        InfoListController.appendInfoList = function (personsInCity, city) {
            return __awaiter(this, void 0, void 0, function () {
                var _loop_1, _i, personsInCity_1, person;
                return __generator(this, function (_a) {
                    this.setCityTitle(city);
                    _loop_1 = function (person) {
                        $('.info-list').append($('<div>').attr({ class: 'info-element', id: person.id_award_receiving }).append([
                            $('<ul>').attr('class', 'info-element-table').append([
                                $('<li>').append("<b>\u0424\u0418\u041E</b>: ".concat(person.person_full_name)),
                                $('<br>'),
                                $('<li>').append("<b>\u041F\u0440\u0435\u043C\u0438\u044F</b>: ".concat(person.award_name)),
                                $('<li>').append("<b>\u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0437\u043D\u0430\u043D\u0438\u044F</b>: ".concat(person.area)),
                                $('<li>').append("<b>\u0413\u043E\u0434</b>: ".concat(person.award_year))
                            ]),
                            $('<img>').attr({
                                src: '/static/resources/hide.svg',
                                class: 'info-hide-icon',
                                alt: 'hide'
                            }).on('click', function (event) {
                                if (event.target.classList.contains('info-hide-icon-active')) {
                                    InfoListController.minimizeInfoElement(person.id_award_receiving);
                                }
                                else {
                                    data_1.DataLoader.requestPerson(person.id_award_receiving).then(function (personInfo) {
                                        InfoListController.appendPersonInfo(person.id_award_receiving, personInfo);
                                    });
                                }
                            })
                        ]));
                    };
                    for (_i = 0, personsInCity_1 = personsInCity; _i < personsInCity_1.length; _i++) {
                        person = personsInCity_1[_i];
                        _loop_1(person);
                    }
                    return [2 /*return*/];
                });
            });
        };
        InfoListController.addHint = function (text) {
            $('.info-list').append([
                $('<br>'),
                $('<div>').attr({ class: 'info-element' }).append($('<ul>').attr('class', 'info-element-table').append($('<li>').append($('<b>').append(text))))
            ]);
        };
        InfoListController.setCityTitle = function (s) {
            $('.info-town').html(s);
        };
        InfoListController.clearInfoList = function () {
            $('.info-list').empty();
            this._loadedCount = 0;
            this._bindedCity = '';
        };
        InfoListController.hidePanel = function () {
            $('.tab-right').removeClass('tab-right-active');
            $('.info-btn').removeClass('info-btn-active');
        };
        InfoListController.showPanel = function () {
            $('.tab-right').addClass('tab-right-active');
            $('.info-btn').addClass('info-btn-active');
        };
        InfoListController.setInfoLoader = function () {
            $('.info-list').append($('<div>').attr('class', 'loader loader-info loader-active').append($('<div>').attr('class', 'loader-els').append([
                $('<span>').attr('class', 'loader-el'),
                $('<span>').attr('class', 'loader-el'),
                $('<span>').attr('class', 'loader-el'),
                $('<span>').attr('class', 'loader-el'),
            ])));
        };
        InfoListController.removeInfoLoader = function () {
            $('.info-list .loader-info').remove();
        };
        InfoListController.appendPersonInfo = function (id, personInfo) {
            $("#".concat(id, " .info-element-table")).append([
                $('<li>').attr({ class: 'info-additional' }).append("<b>\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F</b>: ".concat(personInfo.organization)),
                $('<li>').attr({ class: 'info-additional' }).append("<b>\u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043F\u0440\u0435\u043C\u0438\u0438</b>: ".concat(personInfo.rank)),
                $('<li>').attr({ class: 'info-additional' }).append("<b>\u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435</b>: ".concat(personInfo.achievement)),
                $('<li>').attr({ class: 'info-additional' }).append("<b>\u041A\u043E\u043B\u043B\u0435\u043A\u0442\u0438\u0432</b>: ".concat(personInfo.team.map(function (x) { return x.person; }).join(', ')))
            ]);
            $("#".concat(id, " .info-hide-icon")).addClass('info-hide-icon-active');
        };
        InfoListController.minimizeInfoElement = function (id) {
            $("#".concat(id, " .info-element-table .info-additional")).remove();
            $("#".concat(id, " .info-hide-icon")).removeClass('info-hide-icon-active');
        };
        InfoListController.requestMoreInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._loadedCount >= this._maxSize || this._onRequestState)
                                return [2 /*return*/];
                            this._onRequestState = true;
                            this.setInfoLoader();
                            return [4 /*yield*/, data_1.DataLoader.requestCityPersonsChunk(filterMenuController_1.FilterMenuController.getFilters(this._bindedCity), this._loadedCount)];
                        case 1:
                            data = _a.sent();
                            return [4 /*yield*/, this.appendInfoList(data, this._bindedCity)];
                        case 2:
                            _a.sent();
                            this._loadedCount += this._chunkSize;
                            this.removeInfoLoader();
                            this._onRequestState = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        InfoListController._onRequestState = false;
        InfoListController._loadedCount = 0;
        InfoListController._chunkSize = 100;
        return InfoListController;
    }());
    exports.InfoListController = InfoListController;
});
