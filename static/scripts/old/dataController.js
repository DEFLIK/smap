let xhr = new XMLHttpRequest();
let submitButton = document.querySelector('.submit-info');
let cordX = document.querySelector('.cords-x-info');
let cordY = document.querySelector('.cords-y-info');
let cordYear = document.querySelector('.cords-year-info');
let cordId = document.querySelector('.cords-id-info');
let dataInfo = document.querySelector('.data-info');
let out = document.querySelector('.out-info');
let featuresData = []

let organIndexer;
let organ;
let namesIndexer;
let names;
// let namesIndexer;
// let names;

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
    requestFilteredData('all', 'all', 'all', 'all', 'all', 'all', 'all');

    $.ajax({
        url: '/smap-api/v1.0/getRanksForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        let ranks = json.ranks;
        addSettingsToList('filter-rank', ranks);
    });

    $.ajax({
        url: '/smap-api/v1.0/getKnowledgeAreasForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        let know = json.knowledge_areas;
        addSettingsToList('filter-knowledge', know);
    });

    $.ajax({
        url: '/smap-api/v1.0/getAwardsNamesForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        let awards = json.awards_names; //3
        addSettingsToList('filter-award', awards);
    });

    $.ajax({
        url: '/smap-api/v1.0/getOrganizationsNamesForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        organ = Array.from(new Set(json.organizations_names));
        organIndexer = new Indexer(organ);
    });

    $.ajax({
        url: '/smap-api/v1.0/getUsernamesForFilter',
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        names = Array.from(new Set(json.usernames));
        namesIndexer = new Indexer(names);
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
    let syear = $('.out-syear').html()
    let eyear = $('.out-eyear').html()
    let area = $('.out-knowledge').html()
    let org = $('.out-org').html()
    let rank = $('.out-rank').html()
    let award = $('.out-award').html()
    let username = $('.out-name').html()

    $.ajax({
        url: `/smap-api/v1.0/getPeople?city=${cityName}&s_year=${syear}&e_year=${eyear}&area=${area}&org=${org}&rank=${rank}&award=${award}&username=${username}`,
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

function requestFilteredData(syear, eyear, area, org, rank, award, username) {
    $.ajax({
        url: `/smap-api/v1.0/getNumberOfPeopleInCities?city=all&s_year=${syear}&e_year=${eyear}&area=${area}&org=${org}&rank=${rank}&award=${award}&username=${username}`,
        type: 'GET',
        contentType: "application/json"
    }).done(function (json) {
        featuresData = json;
        removeMarkers();
        addMarkers(featuresData);
    }).catch(() => {
        removeMarkers();
    });
}