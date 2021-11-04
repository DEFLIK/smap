let info = document.querySelector('.info');
let infoButton = document.querySelector('.info-btn');
let menuButton = document.querySelector('.menu-btn');
let menuButtonIcon = document.querySelector('.menu-btn-icon');
let menuSettings = document.querySelector('.menu-settings')

infoButton.onclick = function () {
    info.classList.toggle('info-active');
    infoButton.classList.toggle('info-btn-active');
}

menuButton.onclick = function () {
    menuSettings.classList.toggle('menu-settings-active');
    menuButtonIcon.classList.toggle('menu-btn-icon-active');
}