// To refactor

let addMarkers = function() {};
let removeMarkers = function() {};

function init() {
    let map = new ymaps.Map('map-main', {
        center: [56.981750014637555,49.34446269050328],
        zoom: 4
    });
    
    let MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="popover top">' +
            '<a class="close" href="#"></a>' +
            '<div class="arrow"></div>' +
            '<h3 class="popover-title">Список городов</h3>' +
            '<div class="popover-content">' + 
                '{% for geoObject in properties.geoObjects %}' +
                    '<div class="popover-city" onclick="requestCityData(\'{{ geoObject.properties.clusterCaption }}\')">' +
                        '<span class="">{{ geoObject.properties.clusterCaption }}</span>' +
                        '<span class="popover-city-count">{{ geoObject.properties.iconCaption }}</span>' +
                    '</div>' +
                '{% endfor %}'+
            '</div>' +
        '</div>', {

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

    let clusterer = new ymaps.Clusterer({
        preset: 'twirl#redClusterIcons',
        clusterBalloonLayout: MyBalloonLayout
    }),
        collection = new ymaps.GeoObjectCollection()

    map.geoObjects.add(clusterer);
    map.geoObjects.add(collection);

    addMarkers = function (featuresData) {
        let newPlacemarks = createGeoObjects(featuresData);

        clusterer.options.set({
            gridSize: 30,
            disableClickZoom: true
        });

        clusterer.add(newPlacemarks);
    }

    removeMarkers = function() {
        clusterer.removeAll();
        collection.removeAll();
    }

    function createGeoObjects (featuresData) {
        var placemarks = [];

        for (let mark of featuresData) {
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
                requestCityData(newPlacemark.properties.get('clusterCaption'));
            });
            placemarks.push(newPlacemark);
        }

        return placemarks;
    }

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
}
let promise = ymaps.ready(init);