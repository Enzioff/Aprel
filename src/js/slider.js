import Swiper, {Autoplay, EffectFade, Pagination, Thumbs} from "swiper";
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
        this.visibleSlidesMobile = this.el.getAttribute('data-slider-slides-mobile')

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
            modules: [Pagination, EffectFade, Autoplay],
            slidesPerView: this.visibleSlides ? this.visibleSlides : 1,
            effect: 'fade',
            crossFade: true,
            autoplay: {
              delay: 3000,
            },
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
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
                el: slider.querySelector('.swiper-pagination'),
                clickable: true,
            },
            breakpoints: {
                1200: {
                    slidesPerView: this.visibleSlides ? this.visibleSlides : 3,
                    spaceBetween: 24,
                }
            }
        })
    }

    initThumbsSlider() {
        const slider = this.el.querySelector('.swiper');
        const thumbSlider = document.querySelector('.slider--thumbs');
        const thumb = new Swiper(thumbSlider.querySelector('.swiper'), {
            slidesPerView: 2,
            spaceBetween: 16,
            breakpoints: {
                1200: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                }
            }
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