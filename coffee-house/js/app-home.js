const btnNext = document.querySelector('.slider__next');
const btnPrev = document.querySelector('.slider__prev');
const slidesWrapper = document.querySelector('.slider__wrapper');
const slider = document.querySelector('.slider-content');
const slides = document.querySelectorAll('.slider__item');
const indicators = document.querySelectorAll('.progress');





let hightToSlider = document.querySelector('.header').offsetHeight +  document.querySelector('.top').offsetHeight;
let slideWidth;
let slideIndex = 0;
let x1;
let y1;


setSliderSize();


window.addEventListener('resize', setSliderSize);
window.addEventListener('resize', () => {
         hightToSlider = document.querySelector('.header').offsetHeight +  document.querySelector('.top').offsetHeight;
    
});

window.addEventListener('scroll', () => {
    if(window.scrollY >= hightToSlider) {
        coloredIndicator();
    }

    
});

btnNext.addEventListener('click', showNextSlide);
btnPrev.addEventListener('click', showPrevSlide);

handleEvent (slidesWrapper, 'mouseover mouseout touchstart touchend', slidePause);

document.querySelector('.slider__inner').addEventListener('touchstart', getTouchStart)
document.querySelector('.slider__inner').addEventListener('touchmove', getTouchMove)


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

function getTouchStart (e) {
    const startTouch = e.touches[0];
    x1 = startTouch.clientX;
    y1 = startTouch.clientY;
    
}

function getTouchMove (e) {
    const moveTouch = e.touches[0];
    let x2 = moveTouch.clientX;
    let y2 = moveTouch.clientY;
    let diffX = x2 - x1;
    let diffY = y2 - y1;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if(diffX > 0) {
            showPrevSlide()
        } else {
            showNextSlide() }
    }

    x1=null;
    y1=null;
}



