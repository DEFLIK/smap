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
});
