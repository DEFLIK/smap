// To refactor

$('.info-btn').on('click', function (e) {
    $('.tab-right').toggleClass('tab-right-active');
    $('.info-btn').toggleClass('info-btn-active');
});

$('.filter-btn').on('click', function (e) {
    $(this).toggleClass('filter-btn-active');
    $('.filter').toggleClass('filter-active');
    $('.filter-btn-icon').toggleClass('filter-btn-icon-active');
});

$('.filter-option').hover(function(e) {
    if($(this).children('.filter-expander').hasClass('filter-expander-active')) {
        return;
    }
    $(this).children('.filter-expander').toggleClass('filter-expander-open');
});

$('.filter-option').on('click', function(e) {
    if ($(this).hasClass('filter-option-open')) {
        $('.filter-expander').removeClass('filter-expander-active');
        $('.filter-expander .filter-settings').removeClass('filter-settings-open');
        $('.filter-expander .filter-settings .filter-settings-shadow').removeClass('filter-settings-shadow-active');
        $('.filter-option').removeClass('filter-option-open');
        return;
    }

    $('.filter-expander').removeClass('filter-expander-active');
    $('.filter-expander').removeClass('filter-expander-open');
    $('.filter-expander .filter-settings').removeClass('filter-settings-open');
    $('.filter-expander .filter-settings .filter-settings-shadow').removeClass('filter-settings-shadow-active');
    $('.filter-option').removeClass('filter-option-open');

    $(this).children('.filter-expander').toggleClass('filter-expander-active');
    $(this).children('.filter-expander').toggleClass('filter-expander-open');
    $(this).children('.filter-expander').children('.filter-settings').toggleClass('filter-settings-open');
    $(this).children('.filter-expander').children('.filter-settings').children('.filter-settings-shadow').toggleClass('filter-settings-shadow-active');
    $(this).toggleClass('filter-option-open');
});

$('.filter-settings').on('click', function(e) {
    e.stopPropagation();
});

$('.filter-apply').on('click', function(e) {
    $('.filter').removeClass('filter-active');
    $('.filter-btn').removeClass('filter-btn-active');
    $('.filter-btn-icon').removeClass('filter-btn-icon-active');
    let syear = $('.out-syear').html()
    let eyear = $('.out-eyear').html()
    let area = $('.out-knowledge').html()
    let org = $('.out-org').html()
    let rank = $('.out-rank').html()
    let award = $('.out-award').html()
    let username = $('.out-name').html()
    requestFilteredData(syear, eyear, area, org, rank, award, username)
});

// GOVNOKOD ALERT: strongly to classification and refactor
$('.filter-input-org').on('input', function() {
    $('.filter-input-hint-org-inner').empty();
    // console.log(indexer.getWordsByChar(this.value))
    let topWords = [];
    words = this.value.split(' ');
    for (let word of words) {
        topWords.push(BinaryFinder.getTopByPrefix(
            organIndexer.phrases.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
                }), 
            word, 
            10)
        )
    }

    let resultIds = [];
    for (let words of topWords) {
        let res = [];
        let counter = 0;
        for (let word of words) {
            counter++;
            if (counter > 5) {
                break;
            }
            let sets = organIndexer.getSentencesIds(word);
            res = res.concat(Array.from(sets));
        }
        if (resultIds.length === 0) {
            resultIds = res;
        } else {
            resultIds = resultIds.filter(x => res.includes(x));
        }
    }

    let counter = 0;
    for (let id of resultIds) {
        counter++;
        if (counter > 5) {
            break;
        }
        $('.filter-input-hint-org-inner').append(
            [ $('<span>').append(organ[id]), $('<br>') ]
        );
    }
});

$('.filter-input-name').on('input', function() {
    $('.filter-input-hint-name-inner').empty();
    // console.log(indexer.getWordsByChar(this.value))
    let topWords = [];
    words = this.value.split(' ');
    for (let word of words) {
        topWords.push(BinaryFinder.getTopByPrefix(
            namesIndexer.phrases.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
                }), 
            word, 
            10)
        )
    }

    let resultIds = [];
    for (let words of topWords) {
        let res = [];
        let counter = 0;
        for (let word of words) {
            counter++;
            if (counter > 5) {
                break;
            }
            let sets = namesIndexer.getSentencesIds(word);
            res = res.concat(Array.from(sets));
        }
        if (resultIds.length === 0) {
            resultIds = res;
        } else {
            resultIds = resultIds.filter(x => res.includes(x));
        }
    }

    let counter = 0;
    for (let id of resultIds) {
        counter++;
        if (counter > 5) {
            break;
        }
        $('.filter-input-hint-name-inner').append(
            [ $('<span>').append(names[id]), $('<br>') ]
        );
    }
});

$('.filter-input-name').on('input', function() {
    $('.out-name').html(this.value);
});

$('#start_year').on('input', function() {
    $('.out-syear').html(this.value);
});

$('#end_year').on('input', function() {
    $('.out-eyear').html(this.value);
});

$('.filter-input-org').on('input', function() {
    $('.out-org').html(this.value);
});