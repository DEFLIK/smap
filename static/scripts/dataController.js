let xhr = new XMLHttpRequest();
let button = document.querySelector('.submit-info');
let cordX = document.querySelector('.cords-x-info');
let cordY = document.querySelector('.cords-y-info');
let cordYear = document.querySelector('.cords-year-info');
let cordId = document.querySelector('.cords-id-info');
let dataInfo = document.querySelector('.data-info');
let out = document.querySelector('.out-info');
let featuresData = []

button.onclick = function() {
    $(document).ready(function () {
        req = $.ajax({
            url: '/cords/add',
            type: 'POST',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                cordX: cordX.value, 
                cordY: cordY.value, 
                cordYear: cordYear.value,
                cordId: cordId.value,
                dataInfo: dataInfo.value
            })
        }).done(function (json) {
            //$('.out-info').html(`${json[json.length - 1].cordX} ${json[json.length - 1].cordY}`);
            featuresData = json;
            removeMarkers();
            addMarkers(featuresData);
            //map.container.fitToViewport();
        });
    })
}

window.onload = function () {
    req = $.ajax({
        url: '/cords/get',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        featuresData = json;
    });
}

function requestBalloonData(placemark) {
    if (placemark.properties.get('balloonContent') !== undefined) {
        return;
    }

    placemark.properties.set('balloonContent', "Загрузка данных с сервера...");
    
    $.ajax({
        url: `/cords/get/${placemark.properties.get('id')}`,
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        placemark.properties.set('balloonContent', `${placemark.properties.get('id')}: ${json.info}`);
    })
}