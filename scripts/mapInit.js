function init() {
    let map = new ymaps.Map('map-main', {
        center: [55.75399399999374,37.62209300000001],
        zoom: 9
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');

    let mark = new ymaps.Placemark([56.008727690977224,38.3746564765625], {}, {
        
    });
    map.geoObjects.add(mark);
}

ymaps.ready(init);