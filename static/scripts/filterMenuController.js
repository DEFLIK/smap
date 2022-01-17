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
define(["require", "exports", "./data", "./hintsController", "./infoListController"], function (require, exports, data_1, hintsController_1, infoListController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterMenuController = void 0;
    // To refactor
    var FilterMenuController = /** @class */ (function () {
        function FilterMenuController(storage, mapController, organisationIndexer, usernamesIndexer, loaders) {
            var _this = this;
            $('.info-btn').on('click', function (e) {
                $('.tab-right').toggleClass('tab-right-active');
                $('.info-btn').toggleClass('info-btn-active');
            });
            $('.filter-btn').on('click', function (e) {
                $(this).toggleClass('filter-btn-active');
                $('.filter').toggleClass('filter-active');
                $('.filter-btn-icon').toggleClass('filter-btn-icon-active');
            });
            $('.filter-option').hover(function (e) {
                if ($(this).children('.filter-expander').hasClass('filter-expander-active')) {
                    return;
                }
                $(this).children('.filter-expander').toggleClass('filter-expander-open');
            });
            $('.filter-option').on('click', function (e) {
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
            $('.filter-settings').on('click', function (e) {
                e.stopPropagation();
            });
            $('.filter-apply').on('click', function () {
                $('.filter').removeClass('filter-active');
                $('.filter-btn').removeClass('filter-btn-active');
                $('.filter-btn-icon').removeClass('filter-btn-icon-active');
                _this.applyRequest(mapController, loaders);
            });
            $('.filter-input-org').on('input', function () {
                $('.filter-input-hint-org-inner').empty();
                var resultIds = hintsController_1.HintsController.getHints(this.value.split(' ').filter(function (x) { return !!x; }), organisationIndexer, 5);
                if (resultIds.length === 0) {
                    $('.filter-input-hint-org').removeClass('filter-input-hint-active');
                }
                else {
                    $('.filter-input-hint-org').addClass('filter-input-hint-active');
                }
                var _loop_1 = function (i) {
                    $('.filter-input-hint-org-inner').append($('<span>').append(resultIds[i]).on('click', function () {
                        $('.filter-input-org').val("".concat(resultIds[i]));
                    }));
                };
                for (var i = 0; i < resultIds.length && i < 5; i++) {
                    _loop_1(i);
                }
            });
            $('.filter-input-name').on('input', function () {
                $('.filter-input-hint-name-inner').empty();
                var resultWords = hintsController_1.HintsController.getHints(this.value.split(' ').filter(function (x) { return !!x; }), usernamesIndexer, 5);
                if (resultWords.length === 0) {
                    $('.filter-input-hint-name').removeClass('filter-input-hint-active');
                }
                else {
                    $('.filter-input-hint-name').addClass('filter-input-hint-active');
                }
                var _loop_2 = function (i) {
                    $('.filter-input-hint-name-inner').append($('<span>').append(resultWords[i]).on('click', function () {
                        $('.filter-input-name').val("".concat(resultWords[i]));
                    }));
                };
                for (var i = 0; i < resultWords.length && i < 5; i++) {
                    _loop_2(i);
                }
            });
            $('.filter-clear-btn').on('click', function () {
                $('.filter-clear').removeClass('filter-option-open');
                $('.filter-clear .filter-expander').removeClass('filter-expander-active');
                $('.filter-clear .filter-settings').removeClass('filter-settings-open');
                $('.filter-clear .filter-settings-shadow').removeClass('filter-settings-shadow-active');
                FilterMenuController.clearFilters();
                _this.applyRequest(mapController, loaders);
            });
            $(window).keydown(function (e) {
                if (e.key === 'Enter' && $('.filter-btn').hasClass('filter-btn-active')) {
                    $('.filter').removeClass('filter-active');
                    $('.filter-btn').removeClass('filter-btn-active');
                    $('.filter-btn-icon').removeClass('filter-btn-icon-active');
                    _this.applyRequest(mapController, loaders);
                }
            });
        }
        Object.defineProperty(FilterMenuController, "username", {
            get: function () {
                var res = $('.filter-input-name').val();
                return res ? res : 'all';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterMenuController, "years", {
            get: function () {
                var start = $('#start_year').val();
                var end = $('#end_year').val();
                return [start ? start : 'all', end ? end : 'all'];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterMenuController, "knowledge", {
            get: function () {
                return this.getCheckedValues('filter-knowledge');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterMenuController, "award", {
            get: function () {
                return this.getCheckedValues('filter-award');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterMenuController, "rank", {
            get: function () {
                return this.getCheckedValues('filter-rank');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FilterMenuController, "organisations", {
            get: function () {
                var res = $('.filter-input-org').val();
                return res ? res : 'all';
            },
            enumerable: false,
            configurable: true
        });
        FilterMenuController.prototype.applyRequest = function (mapController, loaders) {
            infoListController_1.InfoListController.hidePanel();
            this.loadCities(mapController, loaders).then(function () {
                infoListController_1.InfoListController.clearInfoList();
                infoListController_1.InfoListController.setCityTitle('Выберите город');
                infoListController_1.InfoListController.addHint('Нажмите на метку города, чтобы посмотреть его информацию');
            }, function () {
                infoListController_1.InfoListController.clearInfoList();
                infoListController_1.InfoListController.setCityTitle('Нет результатов :(');
                infoListController_1.InfoListController.addHint('Ничего не найдено. Попробуйте задать другие фильтры');
            }).finally(function () {
                infoListController_1.InfoListController.showPanel();
            });
        };
        FilterMenuController.getFilters = function (cityName) {
            var years = this.years;
            return new data_1.FilterRequestSettings(years[0], years[1], this.knowledge, this.organisations, this.rank, this.award, this.username, cityName);
        };
        FilterMenuController.prototype.loadCities = function (mapController, loaders) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    loaders.forEach(function (e) { e.activate(); });
                    return [2 /*return*/, data_1.DataLoader
                            .requestCities(new data_1.FilterRequestSettings(FilterMenuController.years[0], FilterMenuController.years[1], FilterMenuController.knowledge, FilterMenuController.organisations, FilterMenuController.rank, FilterMenuController.award, FilterMenuController.username)).then(function (cities) {
                            mapController.removeMarkers();
                            mapController.addMarkers(cities);
                        }, function (e) {
                            mapController.removeMarkers();
                            throw e;
                        }).finally(function () {
                            loaders.forEach(function (e) { e.disable(); });
                        })];
                });
            });
        };
        FilterMenuController.prototype.updateFiltersOptions = function (ranks, awards, knowledgeAreas) {
            this.updateFilterOption('filter-rank', ranks);
            this.updateFilterOption('filter-award', awards);
            this.updateFilterOption('filter-knowledge', knowledgeAreas);
        };
        FilterMenuController.prototype.updateFilterOption = function (listClassName, data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var setting = data_2[_i];
                $(".".concat(listClassName))
                    .append($("<input type=\"checkbox\" id=\"".concat(setting, "\" value=\"").concat(setting, "\">")))
                    .append($('<div class="filter-settings-option">')
                    .append($("<label for=\"".concat(setting, "\">"))
                    .append(setting)));
            }
        };
        FilterMenuController.getCheckedValues = function (groupName) {
            var res = new Array();
            $(".".concat(groupName, " input[type=\"checkbox\"]:checked")).each(function () {
                res.push($(this).val());
            });
            return res.length === 0 ? ['all'] : res;
        };
        FilterMenuController.uncheckAll = function (groupName) {
            $(".".concat(groupName, " input[type=\"checkbox\"]:checked")).each(function () {
                this.checked = false;
            });
        };
        FilterMenuController.clearFilters = function () {
            $('.filter-input-name').val('');
            $('#start_year').val('');
            $('#end_year').val('');
            $('.filter-input-org').val('');
            this.uncheckAll('filter-knowledge');
            this.uncheckAll('filter-award');
            this.uncheckAll('filter-rank');
        };
        return FilterMenuController;
    }());
    exports.FilterMenuController = FilterMenuController;
});
