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
define(["require", "exports", "./infoListController"], function (require, exports, infoListController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapController = void 0;
    // To refactor
    var MapController = /** @class */ (function () {
        function MapController() {
        }
        MapController.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                var MyBalloonLayout;
                return __generator(this, function (_a) {
                    this._map = new ymaps.Map('map-main', {
                        center: [56.981750014637555, 49.34446269050328],
                        zoom: 4
                    });
                    MyBalloonLayout = ymaps.templateLayoutFactory.createClass(MapController._ballonTemplate, {
                        build: function () {
                            this.constructor.superclass.build.call(this);
                            this._$element = $('.popover', this.getParentElement());
                            this.applyElementOffset();
                            this._$element.find('.close')
                                .on('click', $.proxy(this.onCloseClick, this));
                            $('.popover');
                        },
                        clear: function () {
                            this._$element.find('.close')
                                .off('click');
                            this.constructor.superclass.clear.call(this);
                        },
                        onSublayoutSizeChange: function () {
                            MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
                            if (!this._isElement(this._$element)) {
                                return;
                            }
                            this.applyElementOffset();
                            this.events.fire('shapechange');
                        },
                        applyElementOffset: function () {
                            this._$element.css({
                                left: -(this._$element[0].offsetWidth / 2),
                                top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                            });
                        },
                        onCloseClick: function (e) {
                            e.preventDefault();
                            this.events.fire('userclose');
                        },
                        getShape: function () {
                            if (!this._isElement(this._$element)) {
                                return MyBalloonLayout.superclass.getShape.call(this);
                            }
                            var position = this._$element.position();
                            return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top], [
                                    position.left + this._$element[0].offsetWidth,
                                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                ]
                            ]));
                        },
                        _isElement: function (element) {
                            return element && element[0] && element.find('.arrow')[0];
                        }
                    });
                    this._clusterer = new ymaps.Clusterer({
                        preset: 'twirl#redClusterIcons',
                        clusterBalloonLayout: MyBalloonLayout
                    });
                    this._collection = new ymaps.GeoObjectCollection();
                    this._map.geoObjects.add(this._clusterer);
                    this._map.geoObjects.add(this._collection);
                    this._map.controls.remove('geolocationControl');
                    this._map.controls.remove('searchControl');
                    this._map.controls.remove('trafficControl');
                    this._map.controls.remove('typeSelector');
                    this._map.controls.remove('fullscreenControl');
                    this._map.controls.remove('zoomControl');
                    this._map.controls.remove('rulerControl');
                    return [2 /*return*/];
                });
            });
        };
        MapController.prototype.addMarkers = function (data) {
            var newPlacemarks = this.createGeoObjects(data);
            this._clusterer.options.set({
                gridSize: 50,
                disableClickZoom: true
            });
            this._clusterer.add(newPlacemarks);
        };
        MapController.prototype.removeMarkers = function () {
            this._clusterer.removeAll();
            this._collection.removeAll();
        };
        MapController.prototype.createGeoObjects = function (data) {
            var placemarks = [];
            var _loop_1 = function (mark) {
                var newPlacemark = new ymaps.Placemark([mark.latitude, mark.longitude], {
                    'iconCaption': mark.count,
                    'hintContent': 'Нажмите, чтобы поулчить данные',
                    'clusterCaption': mark.city,
                    'id': mark.id_address
                }, {
                    'balloonPanelMaxMapArea': 0,
                    'preset': 'islands#blueIcon',
                    'openEmptyBalloon': true,
                    'openBalloonOnClick': false,
                });
                newPlacemark.events.add('click', function () {
                    infoListController_1.InfoListController.bindCityInfo(String(newPlacemark.properties.get('clusterCaption')), Number(newPlacemark.properties.get('iconCaption')));
                });
                placemarks.push(newPlacemark);
            };
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var mark = data_1[_i];
                _loop_1(mark);
            }
            return placemarks;
        };
        MapController._ballonTemplate = '<div class="popover top">' +
            '<a class="close" href="#"></a>' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title">Список городов</h3>' +
            '<div class="popover-content">' +
            '{% for geoObject in properties.geoObjects %}' +
            '<div class="popover-city" onclick="InfoListController.bindCityInfo(\'{{ geoObject.properties.clusterCaption }}\', Number({{ geoObject.properties.iconCaption }}))">' +
            '<span class="popover-city-name">{{ geoObject.properties.clusterCaption }}</span>' +
            '<span class="popover-city-count">{{ geoObject.properties.iconCaption }}</span>' +
            '</div>' +
            '{% endfor %}' +
            '</div>' +
            '</div>';
        return MapController;
    }());
    exports.MapController = MapController;
});
