import inputmask from "inputmask/lib/inputmask";

document.addEventListener('DOMContentLoaded', () => {
    initMask()
})

const initMask = () => {
    const tels = document.querySelectorAll('input[type="tel"]')

    if (!tels) return;

    tels.forEach(tel => {
        inputmask({mask: "+7 (999) 999-99-99"}).mask(tel);
    })
}