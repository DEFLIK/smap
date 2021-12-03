let tabRight = document.querySelector('.tab-right');
let infoButton = document.querySelector('.info-btn');
let filterButton = document.querySelector('.filter-btn');
let filterButtonIcon = document.querySelector('.filter-btn-icon');
let filter = document.querySelector('.filter')
let filterOptions = document.querySelectorAll('.filter-option-btn')

infoButton.onclick = function () {
    tabRight.classList.toggle('tab-right-active');
    infoButton.classList.toggle('info-btn-active');
}

filterButton.onclick = function () {
    filter.classList.toggle('filter-active');
    filterButtonIcon.classList.toggle('filter-btn-icon-active');
}

$('.filter-option-btn').on('click', function(e) {
    if($(this).hasClass('filter-option-btn-active')) {
        $(this).children('.filter-option-btn-icon').removeClass('filter-option-btn-icon-active')
        $(this).removeClass('filter-option-btn-active');
        $(this).parent('.filter-option').removeClass('filter-option-active')
        $(this).parent('.filter-option').children('.filter-settings').removeClass('filter-settings-active');
        return;
    }
    $('.filter-option-btn-icon').removeClass('filter-option-btn-icon-active')
    $('.filter-option-btn').removeClass('filter-option-btn-active');
    $('.filter-option').removeClass('filter-option-active');
    $('.filter-settings').removeClass('filter-settings-active');
    $(this).children('.filter-option-btn-icon').toggleClass('filter-option-btn-icon-active')
    $(this).toggleClass('filter-option-btn-active');
    $(this).parent('.filter-option').toggleClass('filter-option-active')
    $(this).parent('.filter-option').children('.filter-settings').toggleClass('filter-settings-active');
})

$('.filter-apply').on('click', function(e) {
    $('.filter').removeClass('filter-active');
})
