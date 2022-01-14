let xhr = new XMLHttpRequest();
let submitButton = document.querySelector('.submit-info');
let cordX = document.querySelector('.cords-x-info');
let cordY = document.querySelector('.cords-y-info');
let cordYear = document.querySelector('.cords-year-info');
let cordId = document.querySelector('.cords-id-info');
let dataInfo = document.querySelector('.data-info');
let out = document.querySelector('.out-info');
let featuresData = []

// submitButton.onclick = function() {
//     $(document).ready(function () {
//         req = $.ajax({
//             url: '/cords/add',
//             type: 'POST',
//             dataType: "json",
//             contentType: "application/json; charset=utf-8",
//             data: JSON.stringify({
//                 cordX: cordX.value, 
//                 cordY: cordY.value, 
//                 cordYear: cordYear.value,
//                 cordId: cordId.value,
//                 dataInfo: dataInfo.value
//             })
//         }).done(function (json) {
//             //$('.out-info').html(`${json[json.length - 1].cordX} ${json[json.length - 1].cordY}`);
//             featuresData = json;
//             removeMarkers();
//             addMarkers(featuresData);
//             //map.container.fitToViewport();
//         });
//     })
// }

window.onload = function () {
    // $.ajax({
    //     url: '/smap-api/v1.0/getNumberOfPeopleInCities?city=all&s_year=1940&e_year=1943&area=all&org=all&rank=1&award=all&username=all',
    //     type: 'GET',
    //     contentType: "application/json"
    // }).done(function (json) {
    //     featuresData = json;
    //     removeMarkers();
    //     addMarkers(featuresData);
    // });

    $.ajax({
        url: '/smap-api/v1.0/getRanksForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        $()
    });

    $.ajax({
        url: '/smap-api/v1.0/getKnowledgeAreasForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {

    });

    $.ajax({
        url: '/smap-api/v1.0/getAwardsNamesForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {

    });

    $.ajax({
        url: '/smap-api/v1.0/getOrganizationsNamesForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {

    });
}

function requestCityData(cityName) {
    // if (placemark.properties.get('balloonContent') !== undefined) {
    //     return;
    // }

    // placemark.properties.set('balloonContent', "Загрузка данных с сервера...");
    // const cityName = placemark.properties.get('clusterCaption');
    $('.tab-right').addClass('tab-right-active');
    $('.info-btn').addClass('info-btn-active');
    clearInfoList();
    setInfoLoader();

    $.ajax({
        url: `/smap-api/v1.0/getPeople?city=${cityName}&s_year=all&e_year=all&area=all&org=all&rank=1&award=all&username=all`,
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        //placemark.properties.set('balloonContent', `${placemark.properties.get('id')}: ${json.info}`);
        addElementsToInfoList(json, cityName);
        removeInfoLoader();
    })
}

function requestFullInfo(id) {
    $.ajax({
        url: `/smap-api/v1.0/getMoreInfoAboutPerson?id_award_receiving=${id}`,
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        //placemark.properties.set('balloonContent', `${placemark.properties.get('id')}: ${json.info}`);
        appendInfoElement(id, json);
    })
}