// ========== ДАННЫЕ ГАЛЕРЕИ ==========
const galleryImages = [
    {
        id: 1,
        large: '/Images/halls/0.svg',
        thumb: '/Images/halls/0.svg',
        title: '    №1',
        desc: '20 м²',
        capacity: 'до 8 человек',
        number: 'Hall №1'
    },
    {
        id: 2,
        large: '/Images/halls/0.svg',
        thumb: '/Images/halls/2.svg',
        title: '№2',
        desc: '20 м²',
        capacity: 'до 8 человек',
        number: 'Hall №2'
    },
    {
        id: 3,
        large: '/Images/halls/0.svg',
        thumb: '/Images/halls/3.svg',
        title: '№3',
        desc: '30 м²',
        capacity: 'до 8 человек',
        number: 'Hall №3'
    },
    {
        id: 4,
        large: '/Images/halls/0.svg',
        thumb: '/Images/halls/4.svg',
        title: '№4',
        desc: '40 м²',
        capacity: 'до 10 человек',
        number: 'Hall №4'
    }
];

// ========== ЭЛЕМЕНТЫ DOM ==========
const hallsRow = document.querySelector('.halls__row');
const mainWrapper = document.querySelector('.halls-swiper .swiper-wrapper');
const thumbsWrapper = document.querySelector('.halls__swiper-mini .swiper-wrapper');
const hallButtonsContainer = document.getElementById('hallButtons');

// ========== ПЕРЕМЕННЫЕ ДЛЯ СЛАЙДЕРОВ ==========
let mainSwiper, thumbsSwiper;

// ========== СОЗДАНИЕ СЛАЙДОВ И КНОПОК ==========
function createSlides() {
    if (!mainWrapper || !thumbsWrapper || !hallButtonsContainer) {
        console.error('Не найдены контейнеры для слайдов');
        return;
    }

    mainWrapper.innerHTML = '';
    thumbsWrapper.innerHTML = '';
    hallButtonsContainer.innerHTML = '';

    galleryImages.forEach((item, index) => {
        // Основной слайд
        const mainSlide = document.createElement('div');
        mainSlide.className = 'swiper-slide';
        mainSlide.innerHTML = `<img src="${item.large}" alt="${item.title}">`;
        mainWrapper.appendChild(mainSlide);

        // Миниатюра
        const thumbSlide = document.createElement('div');
        thumbSlide.className = 'swiper-slide';
        thumbSlide.innerHTML = `<img src="${item.thumb}" alt="${item.title}">`;
        thumbsWrapper.appendChild(thumbSlide);

        // Кнопка Hall
        const hallBtn = document.createElement('button');
        hallBtn.className = 'halls__btn-row';
        if (index === 0) hallBtn.classList.add('active');
        hallBtn.textContent = item.number;
        hallBtn.dataset.index = index;
        hallButtonsContainer.appendChild(hallBtn);
    });

    attachHallButtonListeners();
}

// ========== НАВЕШИВАНИЕ ОБРАБОТЧИКОВ НА КНОПКИ ==========
function attachHallButtonListeners() {
    document.querySelectorAll('.halls__btn-row').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const idx = parseInt(this.dataset.index);

            document.querySelectorAll('.halls__btn-row').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');

            if (mainSwiper) {
                mainSwiper.slideToLoop(idx, 500);
            }
        });
    });
}

// ========== ОБНОВЛЕНИЕ ТЕКСТА ==========
function updateText(realIndex) {
    const normalizedIndex = realIndex % galleryImages.length;
    const data = galleryImages[normalizedIndex];

    if (!data || !hallsRow) return;

    const [titleEl, descEl, capaEl] = hallsRow.children;

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (capaEl) capaEl.textContent = `👥 ${data.capacity}`;

    document.querySelectorAll('.halls__btn-row').forEach((btn, i) => {
        btn.classList.toggle('active', i === normalizedIndex);
    });

    Array.from(hallsRow.children).forEach(el => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = 'fadeIn 0.5s ease';
    });
}

// ========== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРОВ ==========
function initSwipers() {
    thumbsSwiper = new Swiper('.halls__swiper-mini', {
        slidesPerView: 4,
        spaceBetween: 0,
        watchSlidesProgress: true,
        loopedSlides: galleryImages.length,
        breakpoints: {
            320: { slidesPerView: 2 },
            576: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
        }
    });

    mainSwiper = new Swiper('.halls-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        loopedSlides: galleryImages.length,
        thumbs: {
            swiper: thumbsSwiper,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
        on: {
            slideChange: function () {
                updateText(this.realIndex);
            },
            init: function () {
                updateText(this.realIndex);
            }
        }
    });
}

// ========== ДОПОЛНИТЕЛЬНАЯ СИНХРОНИЗАЦИЯ ==========
function setupAdditionalSync() {
    if (thumbsWrapper) {
        thumbsWrapper.addEventListener('click', () => {
            setTimeout(() => {
                if (mainSwiper) {
                    updateText(mainSwiper.realIndex);
                }
            }, 150);
        });
    }

    const observer = new MutationObserver(() => {
        if (mainSwiper) {
            updateText(mainSwiper.realIndex);
        }
    });

    if (thumbsWrapper) {
        observer.observe(thumbsWrapper, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
}

// ========== RESERVATION СЛАЙДЕР ==========
function initReservationSlider() {
    const swiper = new Swiper('.reservation-swiper', {
        centeredSlides: true,
        navigation: {
            nextEl: '.reservation-arrow-right',
            prevEl: '.reservation-arrow-left',
        },
        pagination: {
            el: '.reservation-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            360: {  // точно на 360px
                slidesPerView: 1.3,
                spaceBetween: 50,
            },
            400: {  // всё что больше 360px
                slidesPerView: 'auto',
                spaceBetween: 90,
            }
        }
    });
}

// ========== АККОРДЕОН ==========
function initAccordion() {
    document.querySelectorAll('.accordion__quest').forEach(questions => {
        questions.addEventListener('click', function () {
            const currentItem = this.closest('.accordion__item');
            const accordionContainer = currentItem.closest('.questions__accordion');
            const isActive = currentItem.classList.contains('active');

            accordionContainer.querySelectorAll('.accordion__item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
}

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 50;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ЕДИНСТВЕННЫЙ ЗАПУСК ==========
document.addEventListener('DOMContentLoaded', () => {
    // ========== CSS-АНИМАЦИЯ ==========
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    // ========== HALLS СЛАЙДЕР ==========
    createSlides();

    setTimeout(() => {
        initSwipers();
        setupAdditionalSync();
    }, 100);

    // ========== КЛАВИАТУРА ==========
    document.addEventListener('keydown', (e) => {
        if (!mainSwiper) return;
        if (e.key === 'ArrowLeft') mainSwiper.slidePrev();
        if (e.key === 'ArrowRight') mainSwiper.slideNext();
    });

    // ========== RESERVATION СЛАЙДЕР ==========
    initReservationSlider();

    const reservationSwiper = document.querySelector('.reservation-swiper')?.swiper;
    if (reservationSwiper) {
        reservationSwiper.on('slideChange', function () {
            const realIndex = this.realIndex % 6;
            document.getElementById('currentSlide').textContent = realIndex + 1;
        });
    }

    // ========== АККОРДЕОН ==========
    initAccordion();

    // ========== ПЛАВНАЯ ПРОКРУТКА ==========
    initSmoothScroll();

    // ========== БУРГЕР-МЕНЮ ==========
    // Элементы
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile__menu');
    const overlay = document.querySelector('.overlay');

    // Проверяем, что все элементы существуют
    if (!burger || !mobileMenu || !overlay) {
        console.log('❌ Не найдены элементы для бургера');
        return;
    }

    console.log('✅ Бургер найден, меню найдено');

    // Функция открытия
    function openMenu() {
        mobileMenu.classList.add('mobile__menu--open');
        overlay.classList.add('overlay--show');
        burger.classList.add('burger--active'); // или burger--follow, если хочешь
        console.log('🍔 Меню открыто');
    }

    // Функция закрытия
    function closeMenu() {
        mobileMenu.classList.remove('mobile__menu--open');
        overlay.classList.remove('overlay--show');
        burger.classList.remove('burger--active');
        console.log('❌ Меню закрыто');
    }

    // Клик по бургеру
    burger.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('🖱️ Клик по бургеру');

        if (mobileMenu.classList.contains('mobile__menu--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Клик по оверлею
    overlay.addEventListener('click', function () {
        if (mobileMenu.classList.contains('mobile__menu--open')) {
            closeMenu();
        }
    });

    // Закрытие по клику на ссылки внутри меню
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Если ссылка ведёт на якорь
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 50;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            closeMenu();
        });
    });

    // Закрытие при изменении размера окна (на десктопе)
    window.addEventListener('resize', function () {
        if (window.innerWidth > 1100 && mobileMenu.classList.contains('mobile__menu--open')) {
            closeMenu();
        }
    });

    // Бургер появляется при скролле
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50 && !mobileMenu.classList.contains('mobile__menu--open')) {
            burger.classList.add('burger--follow');
        } else if (!mobileMenu.classList.contains('mobile__menu--open') && window.scrollY <= 50) {
            burger.classList.remove('burger--follow');
        }
    });
});
// ========== МОБИЛЬНАЯ ВЕРСИЯ HALLS ==========
document.addEventListener('DOMContentLoaded', function () {
    // Проверяем, мобильное ли устройство
    if (window.innerWidth > 1900) return;

    console.log('📱 Загружаем мобильную версию Halls');

    // Элементы
    const buttonsContainer = document.getElementById('hallButtonsMob');
    const mainSlider = document.getElementById('mainSliderMob');
    const thumbsContainer = document.getElementById('thumbsContainerMob');
    const numberSpan = document.getElementById('hallNumberMob');
    const areaSpan = document.getElementById('hallAreaMob');
    const capacitySpan = document.getElementById('hallCapacityMob');

    let currentIndex = 0;
    let swiper;

    // Создаём кнопки
    function createButtons() {
        buttonsContainer.innerHTML = '';
        galleryImages.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = `halls-mob__btn-row ${index === 0 ? 'active' : ''}`;
            btn.textContent = item.number;
            btn.dataset.index = index;

            btn.addEventListener('click', function () {
                const idx = parseInt(this.dataset.index);
                switchToHall(idx);
            });

            buttonsContainer.appendChild(btn);
        });
    }

    // Создаём слайды
    function createSlides() {
        mainSlider.innerHTML = '';
        thumbsContainer.innerHTML = '';

        galleryImages.forEach((item, index) => {
            // Основные слайды
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${item.large}" alt="${item.number}">`;
            mainSlider.appendChild(slide);

            // Миниатюры (вертикальные)
            const thumb = document.createElement('div');
            thumb.className = `halls-mob__thumb ${index === 0 ? 'active' : ''}`;
            thumb.dataset.index = index;
            thumb.innerHTML = `<img src="${item.thumb}" alt="">`;

            thumb.addEventListener('click', function () {
                const idx = parseInt(this.dataset.index);
                switchToHall(idx);
            });

            thumbsContainer.appendChild(thumb);
        });
    }

    // Обновление информации
    function updateInfo(index) {
        const data = galleryImages[index];
        numberSpan.textContent = data.number;
        areaSpan.textContent = data.area;
        capacitySpan.textContent = data.capacity;

        // Обновляем активные кнопки
        document.querySelectorAll('.halls-mob__btn-row').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        // Обновляем активные миниатюры
        document.querySelectorAll('.halls-mob__thumb').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Переключение на другой зал
    function switchToHall(index) {
        currentIndex = index;
        updateInfo(index);

        if (swiper) {
            // Переключаем слайдер на правильный индекс с учётом loop
            swiper.slideToLoop(index, 0);  // ← slideToLoop вместо slideTo!
        }
    }

    // Инициализация Swiper
    function initSwiper() {
        swiper = new Swiper('.halls-mob__swiper', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            loopedSlides: galleryImages.length,  // ← важно!
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
                slideChange: function () {
                    // При смене слайда используем realIndex
                    const realIndex = this.realIndex;
                    if (realIndex !== currentIndex) {
                        currentIndex = realIndex;
                        updateInfo(realIndex);
                    }
                }
            }
        });
    }

    // Запуск
    createButtons();
    createSlides();
    updateInfo(0);
    initSwiper();
});