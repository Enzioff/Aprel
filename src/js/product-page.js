document.addEventListener('DOMContentLoaded', () => {
    initLiveUpdate()
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
    const productInfo = modal.querySelector('.product-detail__content')

    sendButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productPageInfo = document.querySelector('.product-page__form .product-page__list').cloneNode(true)
            const productItems = productPageInfo.querySelectorAll('li')
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
            productList.innerHTML = '';
            productItems.forEach(el => {
                productList.insertAdjacentElement('beforeend', el)
            })
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
        value = parseInt(quantity, 10) > 1 ? quantity : 1
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

const initLiveUpdate = () => {
    const visibleElements = document.querySelectorAll('[data-visible]')
    const typesElements = document.querySelectorAll('[data-shape-type]')
    let volumeElements = document.querySelectorAll('[data-price]')
    const pensPriceCircle = document.querySelectorAll('[data-price-pens-circle]');
    const pensPriceRound = document.querySelectorAll('[data-price-pens-round]');
    const pensPrice = document.querySelector('[data-pens-price]')
    const totalPrice = document.querySelector('[data-final-price]')
    const quantity = document.querySelector('[data-quantity]')
    const paramType = document.querySelector('[data-param-shape]')
    const width = document.querySelector('[data-width]')
    const height = document.querySelector('[data-height]')

    if (!visibleElements) return
    if (!visibleElements[0]) return

    visibleElements[0].style.display = 'block'

    const updatePrice = () => {
        const currentElement = Array.from(volumeElements).find(el => el.checked);
        const currentType = Array.from(typesElements).find(el => el.checked).getAttribute('data-shape-type');
        const currentTypeValue = Array.from(typesElements).find(el => el.checked).value;
        const currentWidth = currentElement.getAttribute('data-volume-width')
        const currentHeight = currentElement.getAttribute('data-volume-height')
        const maxPrice = quantity.getAttribute('max');
        let price = 0;

        if (currentType === 'circle') {
            price = price + +currentElement.getAttribute('data-price')
        } else {
            price = price + +currentElement.getAttribute('data-price-second')
        }

        if (pensPrice.checked) {
            if (currentType === 'circle') {
                pensPrice.setAttribute('data-pens-price', currentElement.getAttribute('data-price-pens-circle'))
            } else {
                pensPrice.setAttribute('data-pens-price', currentElement.getAttribute('data-price-pens-round'))
            }
            price += +pensPrice.getAttribute('data-pens-price')
        }

        if (quantity.value <= 0) {
            price *= 1;
        } else if (quantity.value > +maxPrice) {
            quantity.value = +maxPrice;
            price *= quantity.value
        } else {
            price *= quantity.value
        }

        paramType.textContent = currentTypeValue
        width.textContent = currentWidth
        height.textContent = currentHeight

        totalPrice.textContent = `${price}`;
    }

    updatePrice()

    typesElements.forEach((type, idx) => {
        type.addEventListener('change', () => {
            const currentType = type.getAttribute('data-shape-type')
            visibleElements.forEach(temp => temp.style.display = null)
            let pensIsToggle = !!document.querySelector('[data-pens-price]').checked
            const current = Array.from(visibleElements).filter(element => {
                if (element.getAttribute('data-visible') === currentType) {
                    if (pensIsToggle && element.hasAttribute('data-visible-pens')) {
                        return element
                    } else if (!pensIsToggle && !element.hasAttribute('data-visible-pens')) {
                        return element
                    }
                }
            })[0]
            current.style.display = 'block'

            updatePrice(currentType)
        })
    })

    volumeElements.forEach(el => {
        el.addEventListener('change', () => {
            const currentElement = Array.from(typesElements).find(el => el.checked);
            updatePrice(currentElement.getAttribute('data-shape-type'))
        })
    })

    pensPrice.addEventListener('change', () => {
        const currentElement = Array.from(typesElements).find(el => el.checked);
        visibleElements.forEach(temp => temp.style.display = null)
        let pensIsToggle = !!document.querySelector('[data-pens-price]').checked

        const current = Array.from(visibleElements).filter(element => {
            if (element.getAttribute('data-visible') === currentElement.getAttribute('data-shape-type')) {
                if (pensIsToggle && element.hasAttribute('data-visible-pens')) {
                    return element
                } else if (!pensIsToggle && !element.hasAttribute('data-visible-pens')) {
                    return element
                }
            }
        })[0]
        current.style.display = 'block'
        updatePrice(currentElement.getAttribute('data-shape-type'))
    })

    quantity.addEventListener('input', () => {
        if (quantity.value <= 0) {
            quantity.value = 1;
        }
        const currentElement = Array.from(typesElements).find(el => el.checked);
        updatePrice(currentElement.getAttribute('data-shape-type'))
    })

}