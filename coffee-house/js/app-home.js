const btnNext = document.querySelector('.slider__next');
const btnPrev = document.querySelector('.slider__prev');
const slidesWrapper = document.querySelector('.slider__wrapper');
const slider = document.querySelector('.slider-content');
const slides = document.querySelectorAll('.slider__item');
const indicators = document.querySelectorAll('.progress');



let slideWidth;
let slideIndex = 0;


setSliderSize();
coloredIndicator();

window.addEventListener('resize', setSliderSize);
btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);

handleEvent (slidesWrapper, 'mouseover mouseout touchstart touchend', slidePause)


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
    coloredIndicator();
   

}

function showPrevSlide() {

    if (slideIndex == 0) {
        slideIndex = slides.length - 1;
    } else {
        slideIndex--;
    }
    slider.style.transform = `translateX(-${parseFloat(slideWidth) * slideIndex}px)`;
    coloredIndicator();
}


function coloredIndicator() {
    indicators.forEach ( (item) => {
        item.classList.remove('progress--active');
        item.addEventListener("animationend", showNextSlide);
    })
   
    indicators[slideIndex].classList.add('progress--active');
    
}

function slidePause (e) {
    e.preventDefault();
    const activeBar = document.querySelector('.progress--active');
    if(e.type == 'mouseover' || e.type == 'touchstart') {
        activeBar.style.animationPlayState = 'paused'
    }
    if(e.type == 'mouseout' || e.type == 'touchend') {
        activeBar.style.animationPlayState = 'running'
    }

}

function handleEvent (obj, eventList, func) {
    const events = eventList.split(' ');
    events.forEach (event => {
        obj.addEventListener(event, func)
    })

}



