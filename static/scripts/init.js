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
define(["require", "exports", "./hashIndexer", "./data", "./filterMenuController", "./mapController", "./infoListController", "./stateController"], function (require, exports, hashIndexer_1, data_1, filterMenuController_1, mapController_1, infoListController_1, stateController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    window.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var storage, _a, _b, organIndexer, nameIndexer, mapController, loader, loaderBackground, filterMenu, awardsResp, knowlResp, ranksResp;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = data_1.DataStorage.bind;
                        return [4 /*yield*/, data_1.DataLoader.requestFilterInfo(data_1.FilterEndPointUrls.organizationNames)];
                    case 1:
                        _b = [void 0, // to remove Array -> Set -> Array after back fix
                            (_c.sent()).organizations_names];
                        return [4 /*yield*/, data_1.DataLoader.requestFilterInfo(data_1.FilterEndPointUrls.usernames)];
                    case 2:
                        storage = new (_a.apply(data_1.DataStorage, _b.concat([(_c.sent()).usernames])))();
                        organIndexer = new hashIndexer_1.HashIndexer(storage.organisations);
                        nameIndexer = new hashIndexer_1.HashIndexer(storage.usernames);
                        mapController = new mapController_1.MapController();
                        ymaps.ready().then(function () {
                            mapController.init();
                        });
                        loader = new stateController_1.StateController('loader-map', 'loader-active');
                        loaderBackground = new stateController_1.StateController('loader-background', 'loader-background-active');
                        filterMenu = new filterMenuController_1.FilterMenuController(storage, mapController, organIndexer, nameIndexer, [loader, loaderBackground]);
                        return [4 /*yield*/, data_1.DataLoader.requestFilterInfo(data_1.FilterEndPointUrls.awardNames)];
                    case 3:
                        awardsResp = (_c.sent()).awards_names;
                        return [4 /*yield*/, data_1.DataLoader.requestFilterInfo(data_1.FilterEndPointUrls.knowledgeAreas)];
                    case 4:
                        knowlResp = (_c.sent()).knowledge_areas;
                        return [4 /*yield*/, data_1.DataLoader.requestFilterInfo(data_1.FilterEndPointUrls.ranks)];
                    case 5:
                        ranksResp = (_c.sent()).ranks;
                        filterMenu.updateFiltersOptions(ranksResp, awardsResp, knowlResp);
                        window['InfoListController'] = infoListController_1.InfoListController; // for public DOM usage
                        $('.info-list').scroll(function () {
                            if (this.offsetHeight + this.scrollTop >= this.scrollHeight && this.scrollTop !== 0) { // this.scrollTop !== 0 for necessary scroll event on list clearing
                                infoListController_1.InfoListController.requestMoreInfo();
                            }
                        });
                        filterMenu.loadCities(mapController, [loader, loaderBackground]).finally(function () {
                            if (localStorage.getItem('seenTutorial') !== 'true') {
                                $('.about').addClass('about-active');
                                $('.about-menu').addClass('about-menu-active');
                            }
                        });
                        $('.about-close').on('click', function () {
                            $('.about').removeClass('about-active');
                            $('.about-menu').removeClass('about-menu-active');
                            localStorage.setItem('seenTutorial', 'true');
                        });
                        $('.logo').on('click', function () {
                            $('.about').addClass('about-active');
                            $('.about-menu').addClass('about-menu-active');
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
});
