import axios from "axios";
import {Fancybox} from "@fancyapps/ui";

document.addEventListener('DOMContentLoaded', () => {
    initForm()
})

const initForm = () => {
    const forms = document.querySelectorAll('[data-form]')
    if (!forms) return;
    forms.forEach(form => {
        const accept = form.querySelector('[data-form-accept]');
        const submit = form.querySelector('button[type="submit"]');
        const url = form.getAttribute('action')
        const els = [...form.querySelectorAll('input'), ...form.querySelectorAll('textarea')]

        submit.setAttribute('disabled', accept.checked);

        accept.addEventListener('change', () => {
            accept.checked
                ? submit.removeAttribute('disabled')
                : submit.setAttribute('disabled', accept.checked);
        })

        const getData = () => {
            const data = new FormData()

            els.forEach(el => {
                if (el.checked) {
                    data.append(el.name, el.value)
                } else if (el.type === 'file') {
                    data.append(el.name, el.files[0])
                } else if (el.type === 'text' || el.type === 'number' || el.type === 'date' || el.type === "tel" || el.type === 'email' || el.type === 'textarea' || el.type === 'hidden') {
                    data.append(el.name, el.value)
                }
            })

            if (window.productData) {
                window.productData.formData.forEach(el => {
                    data.append(Object.keys(el)[0], ...Object.values(el)[0])
                })
            }

            return data
        }

        const sendData = () => {
            axios.post(url, getData())
                .then(response => response.data)
                .then(data => {
                    Fancybox.close()
                    const title = document.querySelector('[data-modal-title]')
                    const text = document.querySelector('[data-modal-text]')
                    if (title || text) {
                        title.textContent = 'Заявка отправлена';
                        text.textContent = 'Мы свяжемся с вами в ближайшее время.'
                    }

                    Fancybox.show([{
                        src: '#accept',
                        type: 'inline'
                    }])
                })
                .catch(error => {
                    Fancybox.close()
                    const {message} = error;
                    const title = document.querySelector('[data-modal-title]')
                    const text = document.querySelector('[data-modal-text]')
                    if (title || text) {
                        title.textContent = 'Ошибка';
                        text.textContent = message;
                    }

                    Fancybox.show([{
                        src: '#accept',
                        type: 'inline'
                    }])

                    console.error(error)
                })
        }

        form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            sendData()
        })
    })
}