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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FilterEndPointUrls = exports.DataStorage = exports.DataLoader = exports.FilterRequestSettings = void 0;
    var FilterRequestSettings = /** @class */ (function () {
        function FilterRequestSettings(syear, eyear, area, org, rank, award, username, cityName) {
            if (syear === void 0) { syear = 'all'; }
            if (eyear === void 0) { eyear = 'all'; }
            if (area === void 0) { area = ['all']; }
            if (org === void 0) { org = 'all'; }
            if (rank === void 0) { rank = ['all']; }
            if (award === void 0) { award = ['all']; }
            if (username === void 0) { username = 'all'; }
            if (cityName === void 0) { cityName = 'all'; }
            this.syear = syear;
            this.eyear = eyear;
            this.area = area;
            this.org = org;
            this.rank = rank;
            this.award = award;
            this.username = username;
            this.cityName = cityName;
        }
        FilterRequestSettings.prototype.getSettingsPatch = function () {
            return "city=".concat(this.cityName, "&s_year=").concat(this.syear, "&e_year=").concat(this.eyear, "&area=").concat(this.area.join(','), "&org=").concat(this.org, "&rank=").concat(this.rank.join(','), "&award=").concat(this.award.join(','), "&username=").concat(this.username);
        };
        return FilterRequestSettings;
    }());
    exports.FilterRequestSettings = FilterRequestSettings;
    var DataLoader = /** @class */ (function () {
        function DataLoader() {
        }
        DataLoader.requestFilterInfo = function (url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch(url)];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        DataLoader.requestCities = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/smap-api/v1.0/getNumberOfPeopleInCities?".concat(settings.getSettingsPatch()))];
                        case 1:
                            res = _a.sent();
                            if (!res.ok) return [3 /*break*/, 3];
                            return [4 /*yield*/, res.json()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3: throw new Error("Wrong request, or got nothing to return: ".concat(res.statusText));
                    }
                });
            });
        };
        DataLoader.requestCityPersons = function (settings) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/smap-api/v1.0/getPeople?".concat(settings.getSettingsPatch()))];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        DataLoader.requestCityPersonsChunk = function (settings, startIndex) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/smap-api/v1.0/getPieceOfPeople?".concat(settings.getSettingsPatch(), "&start_index=").concat(startIndex))];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        DataLoader.requestPerson = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fetch("/smap-api/v1.0/getMoreInfoAboutPerson?id_award_receiving=".concat(id))];
                        case 1: return [4 /*yield*/, (_a.sent()).json()];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return DataLoader;
    }());
    exports.DataLoader = DataLoader;
    var DataStorage = /** @class */ (function () {
        function DataStorage(_organisations, _usernames) {
            if (_organisations === void 0) { _organisations = new Array(); }
            if (_usernames === void 0) { _usernames = new Array(); }
            this._organisations = _organisations;
            this._usernames = _usernames;
        }
        Object.defineProperty(DataStorage.prototype, "organisations", {
            get: function () {
                return this._organisations;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DataStorage.prototype, "usernames", {
            get: function () {
                return this._usernames;
            },
            enumerable: false,
            configurable: true
        });
        return DataStorage;
    }());
    exports.DataStorage = DataStorage;
    var FilterEndPointUrls;
    (function (FilterEndPointUrls) {
        FilterEndPointUrls["ranks"] = "/smap-api/v1.0/getRanksForFilter";
        FilterEndPointUrls["knowledgeAreas"] = "/smap-api/v1.0/getKnowledgeAreasForFilter";
        FilterEndPointUrls["awardNames"] = "/smap-api/v1.0/getAwardsNamesForFilter";
        FilterEndPointUrls["organizationNames"] = "/smap-api/v1.0/getOrganizationsNamesForFilter";
        FilterEndPointUrls["usernames"] = "/smap-api/v1.0/getUsernamesForFilter";
    })(FilterEndPointUrls = exports.FilterEndPointUrls || (exports.FilterEndPointUrls = {}));
});
