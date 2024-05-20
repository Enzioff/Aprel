document.addEventListener('DOMContentLoaded', () => {
    initMenu()
})

const initMenu = () => {
    const burger = document.querySelector('[data-burger]');
    const mobileMenu = document.querySelector('[data-mobile-menu]')
    burger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active')
        burger.classList.toggle('active')
    })
}