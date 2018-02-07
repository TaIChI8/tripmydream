
document.querySelector("body").onscroll = function () {
    var nav, container, scrolled, help, language;
    nav = document.querySelector(".header__nav");
    help = document.querySelector(".header__text-help")
    language = document.querySelector(".header__text-lang")
    container = document.querySelector(".header__container");
    scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled < 50) {
        help.innerText = "Помощь";
        language.innerText = "Русский (UAH - грн)";
        if (nav.classList.contains("header__nav--visible")) {
            nav.classList.remove("header__nav--visible");
            nav.classList.add("header__nav--hidden");
        }
        if (container.classList.contains("header__container--grid-scroll")) container.classList.remove("header__container--grid-scroll");
        return;
    }
    if (!nav.classList.contains("header__nav--visible")) {
        nav.classList.remove("header__nav--hidden");
        nav.classList.add("header__nav--visible");
    }
    if (!container.classList.contains("header__container--grid-scroll")) {
        container.classList.add("header__container--grid-scroll");
        help.innerText = '';
        language.innerText = "Рус (грн)";
    }
}

var links = document.querySelectorAll(".header__link")
var linksClick = function (e) {
    var active = document.querySelectorAll(".header__text--active");
    for (var i = 0; i < active.length; i++) {
        active[i].classList.remove("header__text--active");
    }
    e.target.querySelector('.header__text').classList.add('header__text--active');
}

for (var i = 0; i < links.length; i++) {
    links[i].onclick = linksClick
}