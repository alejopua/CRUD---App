import modalHtml from './render-modal.html?raw'; // ?raw only works in vite
import './render-modal.css'

let modal, form;

//TODO: load user for id
export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();

    //TODO: Reset del formulario
}

const loadingModal = () => {
    const modalData = modal.querySelector('.modal-dialog');

    // Aplica el estilo display: none; al elemento
    modalData.style.display = 'none';

    modal.innerHTML = `
        <span style="font-weight: bold;">Loading...</span>
    `;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<avoid>} callback 
 * @returns 
 */
export const RenderModal = (element, callback) => {
    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (e) => {
        if (e.target.className !== 'modal-container') return;
        hideModal();
    })

    form.addEventListener('submit', async(e) => {
        e.preventDefault();
        
        const formData = new FormData( form );
        const userlike = {};
        for (const [key,value] of formData) {
            if (key === 'balance') {
                userlike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userlike[key] = (value === 'on') ? true : false;
                continue;
            }

            userlike[key] = value;
        }
        // console.log(userlike);
        await callback(userlike);

        loadingModal();

        setTimeout(() => {
            hideModal()
        }, 500);
    })

    element.append(modal);
}