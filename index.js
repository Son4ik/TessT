const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide"); //все слайды
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indicatorsContainer = document.querySelector(".indicators");

let currentIndex = 0; //текущий индекс слайда
const slideCount = slideItems.length; //количество слайдов
let autoSlideInterval; //id таймера для управления
const autoSlideDelay = 3000; //каждые 3 секунды слайды переключаются
//indiac
//индикаторы
function createIndicators() {
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement("div");
        indicator.classList.add("indicator");

        if (i === currentIndex) {
            indicator.classList.add("active");
        }
        indicator.addEventListener("click", () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

//переход к конкретному слайду
function goToSlide(index) {
    //если дойдем до первого слайда - переходим к последнему при следующем вызове функции
    //иначе, если дойдем до последнего слайда - переходим к первому
    if(index < 0) {
        index = slideCount - 1;
    } else if(index >= slideCount) {
        index = 0;
    }
    currentIndex = index;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    //обновляем индикаторы
    const indicators = document.querySelectorAll(".indicator");
    //переключаем класс active у того индикатора, у которого индекс совпадает с текущим
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === currentIndex)
    );
    resetAutoSlide();
}

//следующий слайд
function nextSlide() {
    goToSlide(currentIndex + 1);
}

//предыдущий слайд
function prevSlide() {
    goToSlide(currentIndex - 1);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

//инициализация слайдера
function init() {
    createIndicators();
    startAutoSlide();
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    //приостановить автопереключение при наведении мыши
//     slider.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
    //продолжать автопереключение, после того как убрано наведение
//     slider.addEventListener("mouseleave", startAutoSlide);+
}

init();
