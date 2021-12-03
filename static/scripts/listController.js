let poop = document.querySelector('.tab-right');

function addElementsToInfoList(json, city) {
    $('.info-town').html(city);
    for (let el of json) {
        $('.info-list').append(
            $('<div>').attr({class: 'info-element', id: el.id_award_receiving}).append(
                [
                    $('<ul>').attr('class', 'info-element-table').append(
                        [
                            $('<li>').append(`<b>ФИО</b>: ${el.person_full_name}`),
                            $('<br>'),
                            $('<li>').append(`<b>Премия</b>: ${el.award_name}`),
                            $('<li>').append(`<b>Область знания</b>: ${el.area}`),
                            $('<li>').append(`<b>Год</b>: ${el.award_year}`)
                        ]
                    ),
                    $('<img>').attr({
                        src: '/static/resources/hide.svg',
                        class: 'info-hide-icon',
                        alt: 'hide'
                    }).on('click', function (event) {
                        if (event.target.classList.contains('info-hide-icon-active')) {
                            minimizeInfoElement(el.id_award_receiving)
                        } else {
                            requestFullInfo(el.id_award_receiving);
                        }
                    })
                ]
            )
        );
    }
}

function clearInfoList() {
    $('.info-list').empty();
}

function setInfoLoader() {
    $('.info-list').append(
        $('<div>').attr('class','info-loader').append('Загрузка с сервера...')
    );
}

function removeInfoLoader() {
    $('.info-list .info-loader').remove();
}

function appendInfoElement(id, json) {
    $(`#${id} .info-element-table`).append(
        [
            $('<li>').attr({class: 'info-additional'}).append(`<b>Организация</b>: ${json.organization}`),
            $('<li>').attr({class: 'info-additional'}).append(`<b>Степень премии</b>: ${json.rank}`),
            $('<li>').attr({class: 'info-additional'}).append(`<b>Достижение</b>: ${json.achievement}`),
            $('<li>').attr({class: 'info-additional'}).append(`<b>Коллектив</b>: ${json.team.map(x => x.person).join(', ')}`)
        ]
    );
    $(`#${id} .info-hide-icon`).addClass('info-hide-icon-active');
}

function minimizeInfoElement(id) {
    $(`#${id} .info-element-table .info-additional`).remove()
    $(`#${id} .info-hide-icon`).removeClass('info-hide-icon-active');
}