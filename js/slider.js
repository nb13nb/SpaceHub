let slideIndex = 0;
let slides = document.querySelectorAll('.slide');
let timer;

function showSlides() {
    let i;
    let current, next;
    current = document.querySelector('.slide.active');
    if (current) current.classList.remove('active');
    slideIndex = (slideIndex + 1) % slides.length;
    next = slides[slideIndex];
    next.classList.add('active');

    timer = setTimeout(showSlides, 4000);
}

function changeSlide(n) {
    clearTimeout(timer); 
    slideIndex += n + slides.length;
    slideIndex %= slides.length; 
    showSlides(); 
}

document.addEventListener('DOMContentLoaded', function () {
    showSlides();
});
