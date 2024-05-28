document.addEventListener('DOMContentLoaded', () => {
    initMasters()
})

const initMasters = () => {
    const masters = document.querySelectorAll('[data-master]')
    const pictures = document.querySelectorAll('[data-person]')
    const media = matchMedia('(max-width: 1200px)')
    const list = document.querySelector('.masters__list');

    if (!masters || !list) return

    masters.forEach(master => {
        const masterPicture = pictures.item(master.getAttribute('data-master'))
        master.addEventListener('click', () => {
            pictures.forEach(temp => temp.classList.remove('active'))
            if (!master.classList.contains('active')) {
                masters.forEach(temp => {
                    temp.classList.remove('active')
                    if (media.matches) {
                        temp.style.position = 'absolute';
                    }
                })
                master.classList.add('active')
                masterPicture.classList.add('active')
                if (media.matches) {
                    if (+master.getAttribute('data-master') === 2) {
                        masters[0].style.left = '-116px'
                        masters[0].style.width = 'auto'
                        master.style.position = 'relative'
                        master.style.width = 'calc(100% - 40px)'
                        master.style.right = '0'
                        list.style.justifyContent = 'flex-end'
                    } else {
                        masters[1].style.right = '-189px'
                        masters[1].style.width = 'auto'
                        master.style.position = 'relative'
                        master.style.width = 'calc(100% - 40px)'
                        master.style.left = '0'
                        list.style.justifyContent = 'flex-start'
                    }
                } else {
                    masters[0].style.position = null;
                    masters[0].style.left = null;
                    masters[0].style.width = null;
                    masters[1].style.position = null;
                    masters[1].style.width = null;
                    masters[1].style.right = null;
                    list.style.justifyContent = null;
                }
            } else {
                master.classList.remove('active')
                masterPicture.classList.remove('active')
                pictures[0].classList.add('active')
                if (media.matches) {
                    masters[0].style.position = 'relative'
                    masters[0].style.left = '0'
                    masters[0].style.width = '100%'
                    masters[1].style.position = 'relative'
                    masters[1].style.width = '100%'
                    masters[1].style.right = '0'
                    list.style.justifyContent = 'space-between'
                } else {
                    masters[0].style.position = null;
                    masters[0].style.left = null;
                    masters[0].style.width = null;
                    masters[1].style.position = null;
                    masters[1].style.width = null;
                    masters[1].style.right = null;
                    list.style.justifyContent = null;
                }
            }
        })
    })
    media.addEventListener('change', () => {
        if (!media.matches) {
            masters.forEach(master => {
                master.style.position = null;
                master.style.left = null;
                master.style.width = null;
                master.style.right = null;
                list.style.justifyContent = null;
            })
        }
    })
}