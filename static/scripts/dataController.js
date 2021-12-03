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
    req = $.ajax({
        url: '/smapapi/v1.0/getCities?city=all&s_year=all&e_year=all&area=all&org=all&rank=all&award=all&username=all',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        featuresData = json;
        removeMarkers();
        addMarkers(featuresData);
    });
}

function requestMarkData(placemark) {
    // if (placemark.properties.get('balloonContent') !== undefined) {
    //     return;
    // }

    // placemark.properties.set('balloonContent', "Загрузка данных с сервера...");
    const cityName = placemark.properties.get('clusterCaption');
    tabRight.classList.add('tab-right-active');
    infoButton.classList.add('info-btn-active');
    clearInfoList();
    setInfoLoader();

    $.ajax({
        url: `/smap-api/v1.0/getPersons?city=${cityName}&s_year=all&e_year=all&area=all&org=all&rank=all&award=all&username=all`,
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
        url: `/smap-api/v1.0/getFullInfo?id_award_receiving=${id}`,
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        //placemark.properties.set('balloonContent', `${placemark.properties.get('id')}: ${json.info}`);
        appendInfoElement(id, json);
    })
}