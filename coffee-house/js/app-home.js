const btnNext = document.querySelector('.slider__next');
const btnPrev = document.querySelector('.slider__prev');
const slidesWrapper = document.querySelector('.slider__wrapper');
const slider = document.querySelector('.slider-content');
const slides = document.querySelectorAll('.slider__item');


let slideWidth;
let slideIndex = 0;


setSliderSize();

window.addEventListener('resize', setSliderSize)
btnNext.addEventListener('click', showNextSlide)
btnPrev.addEventListener('click', showPrevSlide)

function setSliderSize() {

    slideWidth = window.getComputedStyle(slidesWrapper).width;
    slider.style.width = 100 * slides.length + '%';
    slides.forEach(slide => slide.style.width = slideWidth);
    slider.style.transform = `translateX(-${parseFloat(slideWidth) * slideIndex}px)`;
}

function showNextSlide() {

    if (slideIndex == slides.length - 1) {
        slideIndex = 0;
    } else {
        slideIndex++;
    }

    slider.style.transform = `translateX(-${parseFloat(slideWidth) * slideIndex}px)`;
}

function showPrevSlide() {

    if (slideIndex == 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex--;
    }
    slider.style.transform = `translateX(-${parseFloat(slideWidth) * slideIndex}px)`;
}



