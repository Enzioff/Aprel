import axios from "axios";

document.addEventListener('DOMContentLoaded', () => {
    const loadContent = document.querySelector('[data-load-content]')
    const loadMoreBtn = document.querySelector('[data-load-more]')

    if (!loadMoreBtn || !loadContent) return

    const url = loadMoreBtn.getAttribute('data-url')

    if (!url) return

    const load = () => {
        axios.get(url)
            .then(response => response.data)
            .then(data => {
                const parser = new DOMParser()
                const items = parser.parseFromString(data, 'text/html').querySelectorAll('[data-load-item]')
                items.forEach((item) => {
                    loadContent.appendChild(item)
                })
                if (items.length < loadContent.getAttribute('data-loading-count')) {
                    loadMoreBtn.style.display = 'none'
                }
            })
            .catch(error => console.error(error))
    }

    loadMoreBtn.addEventListener('click', load)
})
