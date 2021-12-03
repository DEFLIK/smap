let addMarkers = function() {};
let removeMarkers = function() {};

function init() {
    let map = new ymaps.Map('map-main', {
        center: [56.981750014637555,49.34446269050328],
        zoom: 4
    });

    let clusterer = new ymaps.Clusterer({preset: 'twirl#redClusterIcons'}),
        collection = new ymaps.GeoObjectCollection(),
        monitor;

    map.geoObjects.add(clusterer);
    map.geoObjects.add(collection);

    addMarkers = function (featuresData) {
        let newPlacemarks = createGeoObjects(featuresData);

        clusterer.options.set({
            gridSize: 30,
            disableClickZoom: true
        });

        clusterer.balloon.events.add('open', function (e) {
            var target = e.get('cluster');
            var activeObject = target.state.get('activeObject');
            
            if (monitor) {
                monitor.removeAll();
            }
            monitor = new ymaps.Monitor(target.state);
            monitor.add('activeObject', requestMarkData);
            requestMarkData(activeObject);
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
                requestMarkData(newPlacemark);
            });
            //newPlacemark.events.add('balloonopen', function (e) {requestBalloonData(newPlacemark)});
            placemarks.push(newPlacemark);
        }

        return placemarks;
    }

    addMarkers(featuresData);

    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');


    // map = new ymaps.Map('map-main', {
    //     center: [61.18781918293016,80.76567712426778],
    //     zoom: 4
    // }, 
    // {
    //     searchControlProvider: 'yandex#search'
    // }),
    // objectManager = new ymaps.ObjectManager({
    //     // Чтобы метки начали кластеризоваться, выставляем опцию.
    //     clusterize: true,
    //     // ObjectManager принимает те же опции, что и кластеризатор.
    //     gridSize: 32,
    //     clusterDisableClickZoom: true
    // });

    // map.controls.remove('geolocationControl');
    // map.controls.remove('searchControl');
    // map.controls.remove('trafficControl');
    // map.controls.remove('typeSelector');
    // map.controls.remove('fullscreenControl');
    // map.controls.remove('zoomControl');
    // map.controls.remove('rulerControl');

    // //let mark = new ymaps.Placemark([56.008727690977224,38.3746564765625], {}, {});
    // //map.geoObjects.add(mark);

    // //to refactor...
    // function checkState () {
    //     let shownObjects,
    //         byYear = new ymaps.GeoQueryResult(),
    //         year = parseInt(document.getElementById("year").value),
    //         offset = parseInt(document.getElementById("year_offset").value);
        
    //     byYear = myObjects
    //         .search(`properties.iconCaption <= ${year + offset}`)
    //         .search(`properties.iconCaption >= ${year - offset}`)
    //         .add(byYear);
    //     shownObjects = byYear.addToMap(map);
    //     myObjects.remove(shownObjects).removeFromMap(map);
    // }
    
    // // document.getElementById("year_confirm").onclick = checkState;

    // objectManager.objects.options.set('preset', 'islands#darkGreenCircleDotIcon');
    // objectManager.clusters.options.set('preset', 'islands#invertedDarkGreenClusterIcons');
    // map.geoObjects.add(objectManager);
    // objectManager.add(featuresData);

    // // window.myObjects = ymaps.geoQuery({
    // //     type: "FeatureCollection",
    // //     features: featuresData
    // // }).addToMap(map);
}

// function newpins () {
//     map.geoObjects.removeAll();
//     objectManager.removeAll();

//     objectManager = new ymaps.ObjectManager({
//         // Чтобы метки начали кластеризоваться, выставляем опцию.
//         clusterize: true,
//         // ObjectManager принимает те же опции, что и кластеризатор.
//         gridSize: 32,
//         clusterDisableClickZoom: true
//     });
    
//     objectManager.objects.options.set('preset', 'islands#darkGreenCircleDotIcon');
//     objectManager.clusters.options.set('preset', 'islands#invertedDarkGreenClusterIcons');
//     map.geoObjects.add(objectManager);

//     objectManager.add(featuresData);
// }

let promise = ymaps.ready(init);
promise.done((ym) => {
})