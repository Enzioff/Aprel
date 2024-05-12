import Swiper, {EffectFade, Pagination, Thumbs} from "swiper";
import "swiper/swiper-bundle.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-slider]');
    if (sliders) {
        sliders.forEach(el => {
            new Slider(el)
        })
    }
})


class Slider {
    constructor(el) {
        this.el = el;
        this.type = this.el.getAttribute('data-slider');
        this.visibleSlides = this.el.getAttribute('data-slider-slides')

        this.init()
    }

    init() {
        switch (this.type) {
            case 'intro':
                this.initIntroSlider()
                break;
            case 'thumbs':
                this.initThumbsSlider()
                break;
            default:
                this.initSlider();
                break;
        }
    }

    initIntroSlider() {
        const slider = this.el.querySelector('.swiper');
        const swiper = new Swiper(slider, {
            modules: [Pagination, EffectFade],
            slidesPerView: this.visibleSlides ? this.visibleSlides : 1,
            effect: 'fade',
            crossFade: true,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            }
        })
    }

    initSlider() {
        const slider = this.el.querySelector('.swiper');
        const swiper = new Swiper(slider, {
            modules: [Pagination, Thumbs],
            slidesPerView: this.visibleSlides ? this.visibleSlides : 3,
            spaceBetween: 24,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            },
        })
    }

    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumbSlider = document.querySelector('.slider--thumbs');
        const thumb = new Swiper(thumbSlider.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 30,
        })
        const swiper = new Swiper(slider, {
            modules: [Thumbs],
            slidesPerView: 1,
            spaceBetween: 30,
            thumbs: {
                swiper: thumb ? thumb : null,
            }
        })
        return swiper;
    }
}