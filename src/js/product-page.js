document.addEventListener('DOMContentLoaded', () => {
    initProductPage()
})

const initProductPage = () => {
    const form = document.querySelector('[data-form-intermediate]')

    if (!form) return;

    const sendButtons = form.querySelectorAll('[data-product-id]')
    const modal = document.querySelector('[data-modal-extended]')
    if (!modal) return;
    const productId = modal.querySelector('[data-form-id]')
    const els = [...form.querySelectorAll('input')]
    const productPageInfo = document.querySelector('.product-page__form .product-page__list').cloneNode(true)
    const productInfo = modal.querySelector('.product-detail__content')

    sendButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.productData = {}
            window.productData.formData = [];

            productId.value = button.getAttribute('data-product-id')

            els.forEach(el => {
                if (el.checked || el.type === 'text' || el.type === 'number') {
                    window.productData.formData.push({[el.name]: [el.value]})
                }
            })

            productInfo.innerHTML = '';
            productInfo.insertAdjacentElement('beforeend', productPageInfo)
            const productList = productInfo.querySelector('.product-page__list');
            if (!productList) return
            for (let i = 0; i < window.productData.formData.length; i++) {
                productList.insertAdjacentHTML('beforeend', itemTemplate(window.productData.formData[i]))
            }
        })
    })
}

const itemTemplate = (data) => {
    const quantity = data['QUANTITY'];
    const pens = data['PENS'];
    const shape = data['SHAPE'];
    const volume = data['VOLUME'];
    let title = ''
    let value = ''
    if (quantity) {
        title = 'Количество'
        value = quantity
    } else if (pens) {
        title = 'Добавить ручки'
        value = pens
    } else if (shape) {
        title = 'Тип'
        value = shape
    } else if (volume) {
        title = 'Размер'
        value = volume
    }
    return `
        <li class="product-page__item">
            <strong>${title}</strong>
            <span>${value}</span>
        </li>
    `
}