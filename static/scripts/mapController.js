function init() {
    let map = new ymaps.Map('map-main', {
        center: [61.18781918293016,80.76567712426778],
        zoom: 4
    });

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');

    //let mark = new ymaps.Placemark([56.008727690977224,38.3746564765625], {}, {});
    //map.geoObjects.add(mark);

    //to refactor...
    function checkState () {
        let shownObjects,
            byYear = new ymaps.GeoQueryResult(),
            year = parseInt(document.getElementById("year").value),
            offset = parseInt(document.getElementById("year_offset").value);
        
        byYear = myObjects
            .search(`properties.iconCaption <= ${year + offset}`)
            .search(`properties.iconCaption >= ${year - offset}`)
            .add(byYear);
        shownObjects = byYear.addToMap(map);
        myObjects.remove(shownObjects).removeFromMap(map);
    }
    
    document.getElementById("year_confirm").onclick = checkState;

    window.myObjects = ymaps.geoQuery({
        type: "FeatureCollection",
        features: [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [55.75244503863624,37.62483958203125]
                },
                options: {
                    preset: 'islands#redIcon'
                },
                properties: {
                    iconCaption: 1980
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [56.323598901531085,43.99843423162029],
                },
                options: {
                    preset: 'islands#redIcon',
                },
                properties: {
                    iconCaption: 1968
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [56.802627826607775,60.5945129422139],
                },
                options: {
                    preset: 'islands#redIcon'
                },
                properties: {
                    iconCaption: 1957
                }
            },
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [58.00044835109676,56.17800903596389],
                },
                options: {
                    preset: 'islands#redIcon'
                },
                properties: {
                    iconCaption: 1973
                }
            }
        ]
    }).addToMap(map);
}


let promise = ymaps.ready(init);
promise.done((ym) => {
})