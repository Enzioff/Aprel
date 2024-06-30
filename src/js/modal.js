import {Fancybox} from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Swiper from "swiper";

document.addEventListener('DOMContentLoaded', () => {
    initModal()
})

const initModal = () => {
    Fancybox.bind('[data-fancybox]', {
        backFocus: true,
        on: {
            done: (fancybox, slide) => {
                const index = slide.index;
            }
        }
    })

    const modals = document.querySelectorAll('[data-modal]');
    if (!modals) return;

    modals.forEach(modal => {
        const content = modal.querySelector('[data-modal-content]')
        const close = modal.querySelector('[data-modal-close]')

        const closeModal = () => {
            Fancybox.close()
        }

        modal.addEventListener('click', closeModal)
        close.addEventListener('click', closeModal)
        content.addEventListener('click', (evt) => evt.stopPropagation())
    })
}