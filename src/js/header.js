document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('[data-header]');
    new Header(header)
})

class Header {
    constructor(el) {
        this.el = el;
        this.topLine = document.querySelector('.top-line')
        this.topLineHeight = this.topLine.clientHeight;
        this.init()
    }

    init() {
        this.el.style.top = `${this.topLineHeight}px`;
        this.setHeaderPosition()

        window.addEventListener('scroll', () => {
            this.setHeaderPosition()
        })
    }

    setHeaderPosition() {
        if (window.pageYOffset <= this.topLineHeight) {
            this.el.style.top = `${this.topLineHeight - window.pageYOffset}px`;
        } else {
            this.el.style.top = 0;
        }
    }
}