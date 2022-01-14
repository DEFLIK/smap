import { InfoListController } from "./infoListController";

// To refactor
export class MapController {
    private static _ballonTemplate = 
        '<div class="popover top">' +
            '<a class="close" href="#"></a>' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title">Список городов</h3>' +
            '<div class="popover-content">' + 
                '{% for geoObject in properties.geoObjects %}' +
                    '<div class="popover-city" onclick="InfoListController.bindCityInfo(\'{{ geoObject.properties.clusterCaption }}\', Number({{ geoObject.properties.iconCaption }}))">' +
                        '<span class="popover-city-name">{{ geoObject.properties.clusterCaption }}</span>' +
                        '<span class="popover-city-count">{{ geoObject.properties.iconCaption }}</span>' +
                    '</div>' +
                '{% endfor %}'+
            '</div>' +
        '</div>';
    private _map!: ymaps.Map;
    private _clusterer!: ymaps.Cluster;
    private _collection!: ymaps.GeoObjectCollection;

    public async init() {
        this._map = new ymaps.Map('map-main', {
            center: [56.981750014637555,49.34446269050328],
            zoom: 4
        });
        
        let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(MapController._ballonTemplate, {
            build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = $('.popover', this.getParentElement());
                this.applyElementOffset();
                this._$element.find('.close')
                    .on('click', $.proxy(this.onCloseClick, this));
                $('.popover')
            },
    
            clear: function () {
                this._$element.find('.close')
                    .off('click');
    
                this.constructor.superclass.clear.call(this);
            },
    
            onSublayoutSizeChange: function () {
                MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
    
                if(!this._isElement(this._$element)) {
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
                if(!this._isElement(this._$element)) {
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
        })
        this._collection = new ymaps.GeoObjectCollection()
    
        this._map.geoObjects.add(this._clusterer);
        this._map.geoObjects.add(this._collection);
    
        this._map.controls.remove('geolocationControl');
        this._map.controls.remove('searchControl');
        this._map.controls.remove('trafficControl');
        this._map.controls.remove('typeSelector');
        this._map.controls.remove('fullscreenControl');
        this._map.controls.remove('zoomControl');
        this._map.controls.remove('rulerControl');
    }

    public addMarkers(data) {
        let newPlacemarks = this.createGeoObjects(data);

        this._clusterer.options.set({
            gridSize: 50,
            disableClickZoom: true
        });

        this._clusterer.add(newPlacemarks);
    }

    public removeMarkers() {
        this._clusterer.removeAll();
        this._collection.removeAll();
    }


    private createGeoObjects(data) {
        var placemarks = [];

        for (let mark of data) {
            let newPlacemark = new ymaps.Placemark([mark.latitude, mark.longitude], {
                    'iconCaption': mark.count,
                    'hintContent': 'Нажмите, чтобы поулчить данные',
                    'clusterCaption': mark.city,
                    'id': mark.id_address
                }, {
                    'balloonPanelMaxMapArea': 0,
                    'preset': 'islands#blueIcon',
                    'openEmptyBalloon': true,
                    'openBalloonOnClick': false
                });

            newPlacemark.events.add('click', function () {
                InfoListController.bindCityInfo(String(newPlacemark.properties.get('clusterCaption')), Number(newPlacemark.properties.get('iconCaption')));
            });
            placemarks.push(newPlacemark);
        }

        return placemarks;
    }
}