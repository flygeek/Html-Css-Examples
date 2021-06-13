const headerEL = document.querySelector('header');
const scrollToTop = document.querySelector('.scrollToTop')
window.addEventListener('scroll', () => {
    //header出现并且固定的控制
    let height = headerEL.getBoundingClientRect().height;

    if (window.pageYOffset - height > 800) {
        if (!headerEL.classList.contains('sticky')) {
            headerEL.classList.add('sticky')
        }
    } else {
        headerEL.classList.remove('sticky')
    }

    //回到顶部图标出现时机控制
    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block"
    } else {
        scrollToTop.style.display = "none"
    }
})


//控制轮播图和标题的淡入
const glide = new Glide('.glide');
const captionEl = document.querySelectorAll('.slide-caption');
glide.on(['mount.after', 'run.after'], () => {
    const caption = captionEl[glide.index];
    anime({
        targets: caption.children,
        opacity: [0, 1],
        duration: 400,
        easing: 'linear',
        delay: anime.stagger(400, { start: 300 }),
        translateY: [anime.stagger([40, 10]), 0]
    });
});
glide.on('run.before', () => {
    document.querySelectorAll('.slide-caption > *').forEach(el => {
        el.style.opacity = 0;
    });
})
glide.mount();


//切换成功案例
const isotope = new Isotope('.cases', {
    layoutMode: 'fitRows',
    itemSelector: '.case-item'
})
const filterBtns = document.querySelector('.filter-btns');

filterBtns.addEventListener('click', e => {
    let { target } = e;
    const filterOption = target.getAttribute('data-filter');
    if (filterOption) {
        document.querySelectorAll('.filter-btn.active').forEach(btn => btn.classList.remove('active'));
        target.classList.add('.active');

        isotope.arrange({ filter: filterOption });
    }
})

/* 滑动效果-数字增长变化 */
const staggeringOption = {
    delay: 300,
    distance: '50px',
    duration: 500,
    easing: 'ease-in-out',
    origin: 'bottom'
}

ScrollReveal().reveal('.feature', { ...staggeringOption, interval: 350 })
ScrollReveal().reveal('.service-item', { ...staggeringOption, interval: 350 })

const dataSectionEl = document.querySelector('.data-section');
ScrollReveal().reveal('.data-section', {
    beforeReveal: () => {
        anime({
            targets: '.data-piece .num',
            innerHTML: el => {
                return [0, el.innerHTML];
            },
            duration: 2000,
            round: 1,
            easing: 'easeInExpo'
        })
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 4}px)`
    }
})

//数据部分的视差效果

window.addEventListener('scroll', () => {
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if (bottom >= 0 && top <= window.innerHeight) {
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 4}px)`
    }
})


//锚点滚动效果
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: 'header',
    offset: 80
})

const exploreBtnEls = document.querySelectorAll('.explore-btn')
exploreBtnEls.forEach(exploreBtnEl => {
    exploreBtnEl.addEventListener('click', () => {
        scroll.animateScroll(document.querySelector('#about-us'))
    })
})
